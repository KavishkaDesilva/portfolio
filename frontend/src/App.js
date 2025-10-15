// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ProjectsGrid from "./components/ProjectsGrid";
import ProjectDetail from "./pages/ProjectDetail";
import { LuGraduationCap, LuBriefcase } from "react-icons/lu";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

/* ----------------------- helpers ----------------------- */
function getApiBase() {
  return process.env.REACT_APP_API_BASE || "http://localhost:5000";
}

/* ----------------------- ContactForm (inlined) ----------------------- */
function ContactForm({ apiBase }) {
  const API = apiBase || getApiBase();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, msg: string }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to send email");
      setStatus({ ok: true, msg: "Message sent! I’ll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ ok: false, msg: err.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

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
            name="name"
            required
            placeholder="Enter your name"
            value={form.name}
            onChange={onChange}
            className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Your Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            value={form.email}
            onChange={onChange}
            className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Project inquiry / Internship / Collaboration"
          value={form.subject}
          onChange={onChange}
          className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70">Message</label>
        <textarea
          rows="6"
          name="message"
          required
          placeholder="Tell me a little about your project, timeline, and goals…"
          value={form.message}
          onChange={onChange}
          className="w-full rounded-xl bg-gray-800/60 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/50">
          By submitting, you agree to be contacted at the email/phone you provided.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="btn-press inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:shadow-cyan-500/40 disabled:opacity-70"
        >
          <FiSend /> {loading ? "Sending…" : "Send Message"}
        </button>
      </div>

      {status && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            status.ok
              ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
              : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30"
          }`}
        >
          {status.msg}
        </div>
      )}
    </form>
  );
}

/* ----------------------- App ----------------------- */
function App() {
  const API = getApiBase();

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      fetch(`${API}/api/profile`).then((r) => r.json()),
      fetch(`${API}/api/projects`).then((r) => r.json()),
      fetch(`${API}/api/education`).then((r) => r.json()),
      fetch(`${API}/api/experience`).then((r) => r.json()),
    ]).then(([p, pr, ed, ex]) => {
      if (p.status === "fulfilled") setProfile(p.value);
      if (pr.status === "fulfilled") setProjects(pr.value);
      if (ed.status === "fulfilled") setEducation(ed.value);
      if (ex.status === "fulfilled") setExperience(ex.value);
    });
  }, [API]);

  // ========= Scroll reveal =========
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .stagger > *");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ---------- Skills data ----------
  const skillsData = {
    "Web Technologies": {
      Frontend: [
        "HTML5",
        "JavaScript",
        "ReactJS",
        "CSS",
        "Vue.js",
        "Bootstrap",
        "Tailwind CSS",
        "jQuery",
      ],
      Backend: ["C++", "Java", "NodeJS", "ExpressJS", "PHP", "C#", "Python"],
    },
    "Operating Systems & Environments": ["UNIX/Linux"],
    "Scripting Languages": ["Python", "Bash"],
    Databases: ["MySQL", "PostgreSQL", "SQLite", "NoSQL", "MongoDB", "Firebase"],
    Testing: {
      "Manual Testing": ["Test cases documentation (Google Sheets/Excel)"],
      "Automated Testing": ["Selenium"],
      "API Testing": ["Postman"],
    },
    Cloud: ["Azure", "AWS"],
    "Soft Skills": [
      "Strong problem-solving",
      "Adaptability",
      "Time management",
      "Leadership",
      "Communication Skills",
      "Team collaboration",
      "Analytical Skill",
      "Organization",
    ],
  };

  const Pill = ({ children }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm bg-cyan-500/12 text-cyan-200 ring-1 ring-cyan-400/25">
      {children}
    </span>
  );

  // ========================= HOME PAGE =========================
  const Home = () => (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-20 w-full backdrop-blur bg-gray-900/70 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="group text-xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Portfolio
            </span>
            <span className="ml-1 text-white/50 group-hover:text-white/70 transition">.</span>
          </a>
          <div className="hidden gap-6 md:flex">
            {[
              ["#home", "Home"],
              ["#about", "About"],
              ["#skills", "Skills"],
              ["#edu-exp", "Edu & Exp"],
              ["#portfolio", "Projects"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative px-1 text-white/80 hover:text-white transition group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-violet-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="pt-24">
        <Hero profile={profile} />
      </section>

      {/* About */}
      <section id="about" className="relative overflow-hidden py-24 bg-[#0f172a]">
        <div
          className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,.25), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.25), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
          <div className="reveal relative mx-auto w-[290px] h-[340px] md:w-[360px] md:h-[420px]">
            <span
              className="absolute -inset-7 -z-10 rounded-[2rem] spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(34,211,238,.28), rgba(167,139,250,.28), rgba(34,211,238,.28))",
                WebkitMask: "radial-gradient(transparent 60%, #000 61%)",
                mask: "radial-gradient(transparent 60%, #000 61%)",
              }}
            />
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] blur-3xl glow-pulse"
              style={{ background: "rgba(34,211,238,.22)" }}
            />
            <div
              className="absolute inset-0 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.5)]
                         [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]
                         bg-gradient-to-br from-cyan-400 to-cyan-300"
            />
            <img
              src={(profile && profile.photo) || (process.env.PUBLIC_URL + "/new.png")}
              alt="About"
              className="absolute inset-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)] object-cover rounded-[1.4rem]
                         [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
            />
          </div>

          <div className="reveal text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <p className="mt-2 text-xl font-bold">
              {profile?.role || "Frontend Developer!"}
            </p>
            <p className="mt-5 text-white/80 leading-7">
              {profile?.about ||
                "I am a passionate IT undergraduate with a strong background in programming and software engineering. I have hands-on experience in web development, databases, and software projects, and I’m eager to apply my skills to contribute to innovative solutions."}
            </p>

            <button
              type="button"
              className="btn-press mt-8 inline-block rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black shadow-lg transition hover:shadow-cyan-500/40"
            >
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* ========================== Skills ========================== */}
<section id="skills" className="relative overflow-hidden py-24 bg-gray-800/60">
  {/* soft decorative lights */}
  <div
    className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full blur-3xl"
    style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.25), transparent)" }}
  />
  <div
    className="pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full blur-3xl"
    style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(147,51,234,.2), transparent)" }}
  />

  <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 md:grid-cols-2">
    {/* ---------- Left: your screenshot with glow + caption ---------- */}
    <figure className="reveal relative group">
      <img
        src={process.env.PUBLIC_URL + "/web3.png"} // <- place your image here
        alt="Skills snapshot"
        className="w-full rounded-2xl ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] 
                   transition-transform duration-300 group-hover:scale-[1.015]"
        loading="lazy"
      />
      <figcaption className="mt-3 text-sm text-white/60">
        A quick snapshot of my core skills.
      </figcaption>
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-cyan-500/10 blur-2xl" />
    </figure>

    {/* ---------- Right: interactive skill categories ---------- */}
    <div className="reveal">
      <h2 className="text-4xl font-extrabold mb-6">
        Core <span className="text-cyan-400">Skills</span>
      </h2>

      {/* local pill (uses same style as the rest of your site) */}
      <div className="hidden" aria-hidden />
      {/*
        If you already have Pill in App.jsx, you can remove this inline one.
      */}
      <style>{`.skills-pill{display:inline-flex;align-items:center;padding:.25rem .6rem;border-radius:9999px;font-size:.8rem;background:rgba(34,211,238,.12);color:#a5f3fc;box-shadow:inset 0 0 0 1px rgba(34,211,238,.35)}`}</style>
      {/** utility to render pills */}
      {(() => null)()}

      {/* Data exactly as in your screenshot */}
      {(() => {
        const skillsData = {
          "Web Technologies": {
            Frontend: [
              "HTML5",
              "JavaScript",
              "ReactJS",
              "CSS",
              "Vue.js",
              "Bootstrap",
              "Tailwind CSS",
              "jQuery",
            ],
            Backend: ["C++", "Java", "NodeJS", "ExpressJS", "PHP", "C#", "Python"],
          },
          "Operating Systems & Environments": ["UNIX/Linux"],
          "Scripting languages": ["Python", "Bash"],
          Databases: ["MySQL", "PostgreSQL", "SQLite", "NoSQL Databases", "MongoDB", "Firebase"],
          Testing: {
            "Manual testing": ["Test cases documentation using Google Sheets/Excel"],
            "Automated Testing": ["Selenium"],
            "API Testing": ["Postman"],
          },
          Cloud: ["Azure", "AWS"],
          "Soft Skills": [
            "Strong problem-solving",
            "Adaptability",
            "Time management",
            "Leadership",
            "Communication Skills",
            "Team collaboration",
            "Analytical Skill",
            "Organization",
          ],
        };

        // helper to render pills
        const Pill = ({ children }) => (
          <span className="skills-pill">{children}</span>
        );

        return (
          <div className="space-y-4">
            {/* Web Technologies */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Web Technologies</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5 space-y-3">
                <div>
                  <p className="text-white/70 mb-2 font-semibold">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData["Web Technologies"].Frontend.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-white/70 mb-2 font-semibold">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData["Web Technologies"].Backend.map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            {/* Operating Systems & Environments */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Operating Systems &amp; Environments</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {skillsData["Operating Systems & Environments"].map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </details>

            {/* Scripting */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Scripting languages</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {skillsData["Scripting languages"].map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </details>

            {/* Databases */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Databases</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {skillsData.Databases.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </details>

            {/* Testing */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Testing</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5 space-y-3">
                <div>
                  <p className="text-white/70 mb-2 font-semibold">Manual testing</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.Testing["Manual testing"].map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/70 mb-2 font-semibold">Automated Testing</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.Testing["Automated Testing"].map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/70 mb-2 font-semibold">API Testing</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.Testing["API Testing"].map((s) => (
                      <Pill key={s}>{s}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            {/* Cloud */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Cloud</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {skillsData.Cloud.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </details>

            {/* Soft Skills */}
            <details className="group rounded-2xl bg-[#0f172a] ring-1 ring-white/10 open:ring-cyan-400/30 transition-all reveal">
              <summary className="cursor-pointer select-none px-5 py-4 flex items-center justify-between">
                <span className="font-semibold">Soft Skills</span>
                <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {skillsData["Soft Skills"].map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            </details>
          </div>
        );
      })()}
    </div>
  </div>
</section>

      {/* Education & Experience */}
      <section id="edu-exp" className="relative overflow-hidden py-24 bg-[#0b1220]">
        <div
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.2), transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,.2), transparent)" }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <h2 className="reveal text-center text-4xl font-extrabold">
            My <span className="text-cyan-400">Journey</span>
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {/* Education */}
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/15">
                  <LuGraduationCap className="text-cyan-400 text-xl" />
                </span>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <ol className="relative ps-6">
                {(education?.length
                  ? education
                  : [
                      {
                        school: "SLIIT",
                        degree: "BSc (Hons) in Information Technology",
                        period: "2021 — Present",
                        location: "Malabe, Sri Lanka",
                        details:
                          "Software Engineering focus; DS/DB/MERN coursework.",
                      },
                      {
                        school: "G/Sri Devananda Collage",
                        degree: "G.C.E. A/L (Physical Science)",
                        period: "2010-2019",
                        location: "Ambalangoda",
                        details: "Mathematics, Physics, Chemistry.",
                      },
                    ]
                ).map((e, i) => (
                  <li key={i} className="mb-8">
                    <span className="absolute -start-2 top-1.5 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                    <div className="rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-cyan-400/30 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold">{e.degree}</h4>
                        <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-xs text-cyan-300">
                          {e.period}
                        </span>
                      </div>
                      <p className="mt-1 text-white/80">
                        {e.school}
                        {e.location ? ` — ${e.location}` : ""}
                      </p>
                      {e.details && (
                        <p className="mt-2 text-sm leading-6 text-white/70">{e.details}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Experience */}
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/15">
                  <LuBriefcase className="text-cyan-400 text-xl" />
                </span>
                <h3 className="text-2xl font-bold">Experience</h3>
              </div>

              <ol className="relative ps-6">
                {(experience?.length
                  ? experience
                  : [
                      {
                        company:
                          "Ministry of Agriculture,Livestock, Lands and Irrigation",
                        role: "IT Training",
                        period: "2024 — Present",
                        location: "Baththaramulla",
                        details: "Built React/Tailwind UIs and Express APIs.",
                      },
                      {
                        company: "Tech Studio",
                        role: "Intern Software Engineer",
                        period: "2023 — 2024",
                        location: "Colombo",
                        details: "Dashboards, REST endpoints, and testing.",
                      },
                    ]
                ).map((x, i) => (
                  <li key={i} className="mb-8">
                    <span className="absolute -start-2 top-1.5 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                    <div className="rounded-xl border border-white/10 bg-[#111827] p-5 hover:border-cyan-400/30 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold">{x.role}</h4>
                        <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-xs text-cyan-300">
                          {x.period}
                        </span>
                      </div>
                      <p className="mt-1 text-white/80">
                        {x.company}
                        {x.location ? ` — ${x.location}` : ""}
                      </p>
                      {x.details && (
                        <p className="mt-2 text-sm leading-6 text-white/70">{x.details}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="portfolio" className="relative overflow-hidden py-20 bg-[#0f172a]">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.22), transparent)" }}
        />
        <h2 className="reveal text-center text-4xl font-bold">
          Latest <span className="text-cyan-400">Project</span>
        </h2>
        <div className="reveal mx-auto max-w-5xl px-6 mt-10">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-gray-800/60 to-gray-900 py-24">
        <div
          className="pointer-events-none absolute -top-24 right-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(147,51,234,.22), transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.22), transparent)" }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal text-center">
            <h2 className="text-4xl font-extrabold">
              Contact <span className="text-cyan-400">Me</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/70">
              I’m open to internships, freelance projects, and collaborations. Reach out
              using the form or the details below—I'll get back to you soon.
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
                    <p className="mt-1 text-xs text-white/50">Preferred for opportunities &amp; inquiries.</p>
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
                    <p className="mt-1 text-xs text-white/50">Best time: 9:00–18:00 (IST).</p>
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
                    <p className="font-semibold">{profile?.address || "Ambalangoda, Sri Lanka"}</p>
                    <p className="mt-1 text-xs text-white/50">
                      Available for remote &amp; on-site (Colombo area) work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: contact form — wired to API */}
            <ContactForm apiBase={API} />
          </div>
        </div>
      </section>

      {/* Page-level animation styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(18px); }
        .reveal.is-visible { animation: kf-reveal .7s ease-out forwards; }
        .stagger > * { opacity: 0; transform: translateY(10px); }
        .stagger > *.is-visible, .stagger.is-visible > * { animation: kf-reveal .55s ease-out forwards; }
        .stagger > *:nth-child(1){ animation-delay:.05s }
        .stagger > *:nth-child(2){ animation-delay:.12s }
        .stagger > *:nth-child(3){ animation-delay:.19s }
        .stagger > *:nth-child(4){ animation-delay:.26s }
        .stagger > *:nth-child(5){ animation-delay:.33s }
        @keyframes kf-reveal { to { opacity:1; transform: translateY(0) } }
        .glow-pulse { animation: kf-glow 3s ease-in-out infinite; }
        @keyframes kf-glow { 0%, 100% { opacity: .55; } 50% { opacity: .85; } }
        .spin-slow { animation: kf-rotate 18s linear infinite; }
        @keyframes kf-rotate { to { transform: rotate(360deg); } }
        .btn-press:active { transform: translateY(1px) scale(.995); }
      `}</style>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;
