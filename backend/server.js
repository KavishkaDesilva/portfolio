// server/index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

/* ------------------------- Middleware ------------------------- */
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true, // tighten in prod
  })
);
app.use(express.json({ limit: "1mb" }));

/* ------------------------- Health / Root ---------------------- */
app.get("/", (_, res) => res.send("Portfolio API running ✅"));
app.get("/api/health", (_, res) => res.json({ ok: true, ts: Date.now() }));

/* ------------------------- Mongoose Models -------------------- */
const Profile =
  mongoose.models.Profile ||
  mongoose.model(
    "Profile",
    new mongoose.Schema({
      name: String,
      role: String,
      about: String,
      socials: [{ icon: String, link: String }],
      cv: String,
    })
  );

const Service =
  mongoose.models.Service ||
  mongoose.model(
    "Service",
    new mongoose.Schema({
      title: String,
      description: String,
      icon: String,
    })
  );

const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    new mongoose.Schema({
      title: String,
      description: String,
      image: String,
      link: String,
    })
  );

/* ------------------------- Data Routes ------------------------ */
app.get("/api/profile", async (_, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || null);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to fetch profile" });
  }
});

app.get("/api/services", async (_, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to fetch services" });
  }
});

app.get("/api/projects", async (_, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to fetch projects" });
  }
});

/* ------------------------- Mail Transporter ------------------- */
// Create once (faster than new per request)
const hasMailEnv =
  process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO;
const mailTransporter = hasMailEnv
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // Gmail App Password (not normal pwd)
      },
    })
  : null;

/* ------------------------- Contact Route ---------------------- */
app.post("/api/contact", async (req, res) => {
  try {
    if (!mailTransporter) {
      return res
        .status(500)
        .json({ ok: false, error: "Email is not configured on the server" });
    }

    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // very light email sanity check
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!emailOk) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const info = await mailTransporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : "[Portfolio] New message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
          <h2 style="margin:0 0 8px">New portfolio message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
          <p style="white-space:pre-wrap">${
            (message || "").replace(/</g, "&lt;")
          }</p>
        </div>
      `,
    });

    res.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ ok: false, error: "Failed to send email" });
  }
});

/* ------------------------- Start Server ----------------------- */
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Connect DB first; if you want API without DB, move listen() outside try
    await mongoose.connect(process.env.MONGO_URI, {
      // options optional for modern Mongoose
    });
    app.listen(PORT, () =>
      console.log(`Server on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
