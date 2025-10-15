import React from "react";

/**
 * TechStackShowcase (Top 5 ready)
 * A polished, portfolio-matching visual for your top tech stacks.
 * Dark, glassy cards with subtle cyan accents.
 *
 * Props:
 * - stacks?: string[]  → Which stacks to show (order respected)
 * - max?: number       → Caps the number of visible items (default 5)
 * - title?: string     → Heading text (default "Top 5 Tech Stack")
 * - subtitle?: string  → Small description under the title
 */

// --- Minimal inline brand-style icons (simplified) ---
const SvgWrap = ({ title, children }) => (
  <svg viewBox="0 0 64 64" role="img" aria-label={title} className="h-8 w-8">
    <title>{title}</title>
    {children}
  </svg>
);

const ReactIcon = () => (
  <SvgWrap title="React">
    <circle cx="32" cy="32" r="4" fill="#61DAFB" />
    <g fill="none" stroke="#61DAFB" strokeWidth="3">
      <ellipse cx="32" cy="32" rx="20" ry="8" />
      <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(120 32 32)" />
    </g>
  </SvgWrap>
);

const NodeIcon = () => (
  <SvgWrap title="Node.js">
    <g fill="none" stroke="#7DBE00" strokeWidth="3" strokeLinejoin="round">
      <path d="M32 6 54 18 54 46 32 58 10 46 10 18Z" />
      <path d="M22 28v8c0 6 8 6 8 0v-8" />
      <path d="M30 36c0 6 8 6 8 0v-8" />
    </g>
  </SvgWrap>
);

const ExpressIcon = () => (
  <SvgWrap title="Express">
    <g fill="none" stroke="#EDEDED" strokeWidth="3" strokeLinecap="round">
      <path d="M10 40c8 8 36 8 44 0" />
      <path d="M16 24 32 42 48 24" />
    </g>
  </SvgWrap>
);

const MongoIcon = () => (
  <SvgWrap title="MongoDB">
    <path d="M32 8c8 10 16 18 16 28 0 12-10 18-16 20-6-2-16-8-16-20 0-10 8-18 16-28Z" fill="#10B981" />
    <path d="M32 8c0 22 0 34 0 44" stroke="#065F46" strokeWidth="3" />
  </SvgWrap>
);

const TailwindIcon = () => (
  <SvgWrap title="Tailwind CSS">
    <path d="M20 28c4-8 10-12 18-10 4 1 6 3 8 6-4-2-7-2-10 0-3 2-5 6-10 8-6 2-10 0-12-4 2 2 4 2 6 0Z" fill="#38BDF8" />
    <path d="M18 42c4-8 10-12 18-10 4 1 6 3 8 6-4-2-7-2-10 0-3 2-5 6-10 8-6 2-10 0-12-4 2 2 4 2 6 0Z" fill="#38BDF8" />
  </SvgWrap>
);

const JavaIcon = () => (
  <SvgWrap title="Java">
    <g fill="none" stroke="#F89820" strokeWidth="3" strokeLinecap="round">
      <path d="M24 42c6 4 10 4 16 0" />
      <path d="M20 48c8 6 16 6 24 0" />
    </g>
    <g fill="none" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round">
      <path d="M32 14c-2 4 6 6 0 10 6-2 4-6 0-10Z" />
      <path d="M32 22c-3 4 5 6 0 10 5-2 3-6 0-10Z" />
    </g>
  </SvgWrap>
);

const JspIcon = () => (
  <SvgWrap title="JSP / Servlets">
    <g fill="none" stroke="#EAB308" strokeWidth="3" strokeLinejoin="round">
      <rect x="10" y="12" width="44" height="30" rx="4" />
      <path d="M10 40h44v8H10z" fill="#111827" />
      <path d="M18 28h10M18 20h10M36 24h10" />
    </g>
  </SvgWrap>
);

const JdbcIcon = () => (
  <SvgWrap title="JDBC">
    <g fill="#0EA5E9" stroke="#0EA5E9" strokeWidth="2">
      <ellipse cx="32" cy="16" rx="18" ry="8" fill="none" />
      <path d="M14 16v24c0 4 8 8 18 8s18-4 18-8V16" fill="none" />
      <ellipse cx="32" cy="40" rx="18" ry="8" fill="none" />
    </g>
  </SvgWrap>
);

const MysqlIcon = () => (
  <SvgWrap title="MySQL">
    <g fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 46c10-18 26-18 36 0" />
      <path d="M20 28c8-8 16-8 24 0" />
    </g>
    <circle cx="22" cy="24" r="3" fill="#2563EB" />
  </SvgWrap>
);

const GithubIcon = () => (
  <SvgWrap title="GitHub">
    <g fill="#E5E7EB">
      <path d="M32 10c-12 0-22 10-22 22 0 10 6 18 14 21 1 0 2-1 2-2v-6c-5 1-6-2-7-4-1-2-2-3-4-3 3 0 5 2 6 3 2 4 6 3 8 2 0-2 1-4 2-5-6-1-10-4-10-10 0-3 1-6 3-8-1-3 0-6 1-7 3 0 6 2 8 3 2-1 5-3 8-3 1 1 2 4 1 7 2 2 3 5 3 8 0 6-4 9-10 10 1 1 2 3 2 6v6c0 1 1 2 2 2 8-3 14-11 14-21 0-12-10-22-22-22Z" />
    </g>
  </SvgWrap>
);

const GitIcon = () => (
  <SvgWrap title="Git">
    <g fill="#F97316">
      <path d="M32 8 56 32 32 56 8 32 32 8Z" />
    </g>
    <g fill="#111827">
      <circle cx="32" cy="32" r="4" />
      <circle cx="40" cy="24" r="4" />
      <circle cx="24" cy="40" r="4" />
    </g>
    <g stroke="#111827" strokeWidth="3">
      <path d="M32 32 40 24" />
      <path d="M32 32 24 40" />
    </g>
  </SvgWrap>
);

// Map keys to icon components & brand colors
export const STACK_MAP = {
  React: { icon: ReactIcon, tint: "#61DAFB" },
  "Node.js": { icon: NodeIcon, tint: "#7DBE00" },
  Express: { icon: ExpressIcon, tint: "#EDEDED" },
  MongoDB: { icon: MongoIcon, tint: "#10B981" },
  "Tailwind CSS": { icon: TailwindIcon, tint: "#38BDF8" },
  Java: { icon: JavaIcon, tint: "#F89820" },
  "JSP / Servlets": { icon: JspIcon, tint: "#EAB308" },
  JDBC: { icon: JdbcIcon, tint: "#0EA5E9" },
  MySQL: { icon: MysqlIcon, tint: "#2563EB" },
  GitHub: { icon: GithubIcon, tint: "#E5E7EB" },
  Git: { icon: GitIcon, tint: "#F97316" },
};

export const DEFAULT_TOP5 = ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"];

function StackCard({ name, tint }) {
  const Icon = STACK_MAP[name]?.icon ?? (() => null);
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-5 transition shadow-sm hover:shadow-cyan-500/10 hover:ring-cyan-400/30 focus-within:ring-cyan-400/40"
      style={{ isolation: "isolate" }}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${tint}33, transparent)` }}
      />

      <div className="flex items-center gap-4">
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon />
        </div>
        <div>
          <div className="text-base font-semibold text-white">{name}</div>
          <div className="text-xs text-white/60">Core technology</div>
        </div>
      </div>

      {/* Accent bar */}
      <div className="mt-4 h-1 w-full rounded-full bg-white/5">
        <div className="h-1 rounded-full" style={{ width: "66%", background: tint }} />
      </div>
    </div>
  );
}

function Pill({ label }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/25">
      {label}
    </span>
  );
}

export default function TechStackShowcase({
  stacks = DEFAULT_TOP5,
  max = 5,
  title = "Top 5 Tech Stack",
  subtitle = "The core tools I use—presented consistently with my portfolio’s visual language.",
}) {
  // Dedupe & filter to known keys; cap at max
  const list = Array.from(new Set(stacks)).filter((s) => !!STACK_MAP[s]).slice(0, max);

  // Use 5-across on md screens when we actually have 5
  const gridCols = list.length >= 5 ? "sm:grid-cols-2 md:grid-cols-5" : "sm:grid-cols-2 md:grid-cols-3";

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-6 md:p-7">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {subtitle ? <p className="text-white/70 mt-2">{subtitle}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill label="MERN" />
          <Pill label="REST APIs" />
          <Pill label="Clean Architecture" />
        </div>
      </div>

      {/* Grid */}
      <div className={`mt-6 grid gap-4 ${gridCols}`}>
        {list.map((name) => (
          <StackCard key={name} name={name} tint={STACK_MAP[name].tint} />
        ))}
      </div>

      {/* Subtle legend */}
      <div className="mt-6 rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-4 text-white/70 text-sm">
        <p>
          Each card carries a lightweight, brand-tinted glow and a progress bar accent to keep
          the layout lively without clashing with the rest of the site.
        </p>
      </div>
    </section>
  );
}
