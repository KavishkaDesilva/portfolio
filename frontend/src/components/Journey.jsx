// src/components/Journey.jsx
import {
  LuGraduationCap,
  LuBriefcase,
  LuCalendar,
  LuMapPin,
} from "react-icons/lu";

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-12 h-12 rounded-xl bg-cyan-500/15 grid place-items-center ring-1 ring-cyan-400/30">
        <Icon className="text-cyan-400 text-2xl" />
      </span>
      <div>
        <h3 className="text-2xl md:text-3xl font-extrabold">{title}</h3>
        {subtitle && <p className="text-white/60">{subtitle}</p>}
      </div>
    </div>
  );
}

function ItemCard({ title, headline, period, location, details }) {
  return (
    <div
      className="relative group rounded-2xl p-5 md:p-6 bg-[#101826]
                 ring-1 ring-white/10 hover:ring-cyan-400/40
                 transition-all duration-300 shadow-[0_0_0_rgba(0,0,0,0)]
                 hover:shadow-[0_12px_40px_rgba(34,211,238,0.15)]"
    >
      {/* timeline dot */}
      <span className="absolute -left-4 top-7 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h4 className="text-lg md:text-xl font-bold">{headline}</h4>

        <span className="inline-flex items-center gap-2 text-xs md:text-sm px-2.5 py-1 rounded-full
                         bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/25">
          <LuCalendar className="text-cyan-300" />
          {period}
        </span>
      </div>

      <p className="text-white/75 mt-1">{title}</p>

      <div className="mt-2 flex items-center gap-2 text-white/60 text-sm">
        {location && (
          <>
            <LuMapPin className="text-cyan-300 shrink-0" />
            <span>{location}</span>
          </>
        )}
      </div>

      {details && (
        <p className="mt-3 text-sm leading-7 text-white/70">{details}</p>
      )}

      {/* glow border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl
                      ring-1 ring-transparent group-hover:ring-cyan-400/40
                      group-hover:shadow-[inset_0_0_60px_rgba(34,211,238,0.06)] transition" />
    </div>
  );
}

export default function Journey({ education = [], experience = [] }) {
  // graceful fallbacks if API empty
  const edu = education.length
    ? education
    : [
        {
          school: "SLIIT",
          degree: "BSc (Hons) in IT",
          period: "2023 — Present",
          location: "Malabe, Sri Lanka",
          details:
            "Specialising in Software Engineering; algorithms, databases, and MERN stack.",
        },
        {
          school: "ABC College",
          degree: "G.C.E. A/L (Physical Science)",
          period: "2020 — 2022",
          location: "Colombo",
          details: "Mathematics, Physics, Chemistry.",
        },
      ];

  const exp = experience.length
    ? experience
    : [
        {
          company: "Freelance",
          role: "Frontend Developer (MERN)",
          period: "2024 — Present",
          location: "Remote",
          details:
            "Built responsive React/Tailwind UIs, integrated REST APIs, and deployed to cloud.",
        },
        {
          company: "Tech Studio",
          role: "Intern Software Engineer",
          period: "2023 — 2024",
          location: "Colombo",
          details:
            "Implemented dashboards, wrote Express endpoints, unit tests, and documentation.",
        },
      ];

  // simple tab UI (Education / Experience) for mobile; both visible on desktop
  return (
    <section id="my-journey" className="py-24 bg-[#0b1220]">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            My <span className="text-cyan-400">Journey</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            A quick tour through my education and professional experience.
          </p>
        </header>

        {/* Desktop: two columns; Mobile: tabs via details/summary */}
        <div className="hidden md:grid md:grid-cols-2 gap-12">
          {/* Education column */}
          <div>
            <SectionHeader icon={LuGraduationCap} title="Education" />
            <div className="relative ps-8">
              {/* vertical line */}
              <div className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-white/10" />
              <div className="space-y-6">
                {edu.map((e, i) => (
                  <ItemCard
                    key={i}
                    headline={e.degree}
                    title={e.school}
                    period={e.period}
                    location={e.location}
                    details={e.details}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Experience column */}
          <div>
            <SectionHeader icon={LuBriefcase} title="Experience" />
            <div className="relative ps-8">
              <div className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-white/10" />
              <div className="space-y-6">
                {exp.map((x, i) => (
                  <ItemCard
                    key={i}
                    headline={x.role}
                    title={x.company}
                    period={x.period}
                    location={x.location}
                    details={x.details}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: collapsible sections */}
        <div className="md:hidden space-y-6">
          <details className="rounded-2xl ring-1 ring-white/10 open:ring-cyan-400/30 bg-[#101826]/80">
            <summary className="list-none cursor-pointer px-5 py-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-cyan-500/15 grid place-items-center">
                <LuGraduationCap className="text-cyan-400 text-xl" />
              </span>
              <span className="font-bold text-lg">Education</span>
            </summary>
            <div className="px-5 pb-5 space-y-5">
              {edu.map((e, i) => (
                <ItemCard
                  key={i}
                  headline={e.degree}
                  title={e.school}
                  period={e.period}
                  location={e.location}
                  details={e.details}
                />
              ))}
            </div>
          </details>

          <details className="rounded-2xl ring-1 ring-white/10 open:ring-cyan-400/30 bg-[#101826]/80">
            <summary className="list-none cursor-pointer px-5 py-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-cyan-500/15 grid place-items-center">
                <LuBriefcase className="text-cyan-400 text-xl" />
              </span>
              <span className="font-bold text-lg">Experience</span>
            </summary>
            <div className="px-5 pb-5 space-y-5">
              {exp.map((x, i) => (
                <ItemCard
                  key={i}
                  headline={x.role}
                  title={x.company}
                  period={x.period}
                  location={x.location}
                  details={x.details}
                />
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
