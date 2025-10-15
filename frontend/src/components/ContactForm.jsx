// src/components/ContactSection.jsx
import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactSection({ profile }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-gray-800/60 to-gray-900 py-24"
    >
      <div
        className="pointer-events-none absolute -top-24 right-16 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(147,51,234,.22), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-16 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.22), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center">
          <h2 className="text-4xl font-extrabold">
            Contact <span className="text-cyan-400">Me</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            I’m open to internships, freelance projects, and collaborations.
            Reach out using the form or the details below—I'll get back to you
            soon.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {/* Left: contact cards */}
          <div className="stagger md:col-span-2 space-y-4">
            {/* Email */}
            <div className="reveal rounded-2xl bg-[#0f172a] p-5 ring-1 ring-white/10 transition hover:ring-cyan-400/40">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <FiMail />
                </span>
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <a
                    href={`mailto:${profile?.email || "desilvakavishkaashan@gmail.com"}`}
                    className="font-semibold hover:text-cyan-300"
                  >
                    {profile?.email || "desilvakavishkaashan@gmail.com"}
                  </a>
                  <p className="mt-1 text-xs text-white/50">
                    Preferred for opportunities &amp; inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="reveal rounded-2xl bg-[#0f172a] p-5 ring-1 ring-white/10 transition hover:ring-cyan-400/40">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <FiPhone />
                </span>
                <div>
                  <p className="text-sm text-white/60">Phone / WhatsApp</p>
                  <a
                    href={`tel:${profile?.phone || "0767950895"}`}
                    className="font-semibold hover:text-cyan-300"
                  >
                    {profile?.phone || "0767950895"}
                  </a>
                  <p className="mt-1 text-xs text-white/50">
                    Best time: 9:00–18:00 (IST).
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="reveal rounded-2xl bg-[#0f172a] p-5 ring-1 ring-white/10 transition hover:ring-cyan-400/40">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <FiMapPin />
                </span>
                <div>
                  <p className="text-sm text-white/60">Permanent Address</p>
                  <p className="font-semibold">
                    {profile?.address || "Ambalangoda, Sri Lanka"}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Available for remote &amp; on-site (Colombo area) work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form — wired to API */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'ok'|'err', msg: string }

  async function onSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");

      setStatus({ type: "ok", msg: "Message sent! I’ll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "err", msg: "Sending failed. Please try again later." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="reveal md:col-span-3 space-y-5 rounded-2xl bg-[#0f172a] p-6 ring-1 ring-white/10 md:p-8"
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-white/70">Your Name</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Your Email</label>
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70">Subject</label>
        <input
          type="text"
          placeholder="Project inquiry / Internship / Collaboration"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70">Message</label>
        <textarea
          rows="6"
          required
          placeholder="Tell me a little about your project, timeline, and goals…"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/50">
          By submitting, you agree to be contacted at the email/phone you provided.
        </p>
        <button
          type="submit"
          disabled={sending}
          className={`btn-press inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:shadow-cyan-500/40 ${
            sending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FiSend /> {sending ? "Sending..." : "Send Message"}
        </button>
      </div>

      {/* status */}
      {status && (
        <div
          className={`text-sm mt-2 ${
            status.type === "ok" ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {status.msg}
        </div>
      )}
    </form>
  );
}
