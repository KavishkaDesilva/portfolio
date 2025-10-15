// src/components/About.jsx
export default function About({ profile }) {
  const role =
    profile?.role || "Frontend Developer!";
  const about =
    profile?.about ||
    "I am a passionate IT undergraduate with a strong background in programming and software engineering. I have hands-on experience in web development, databases, and software projects, and I’m eager to apply my skills to contribute to innovative solutions.";
  const photo =
    profile?.photo || (process.env.PUBLIC_URL + "/kavishka.png");

  // Optional quick highlights (edit or remove)
  const highlights = [
    "MERN & REST APIs",
    "Clean, accessible UI",
    "Performance-minded",
    "Team & ownership",
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#0b1023] py-24">
      {/* Ambient gradient glows */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.3), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(167,139,250,.25), transparent)" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        {/* Left: hexagon photo with neon border + subtle motion */}
        <div className="reveal-l float-anim relative mx-auto h-[340px] w-[290px] md:h-[420px] md:w-[360px]">
          {/* rotating conic ring */}
          <span
            className="absolute -inset-7 -z-10 rounded-[2rem] spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(34,211,238,.35), rgba(167,139,250,.35), rgba(34,211,238,.35))",
              WebkitMask: "radial-gradient(transparent 60%, #000 61%)",
              mask: "radial-gradient(transparent 60%, #000 61%)",
            }}
          />
          {/* cyan glow */}
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] blur-3xl glow-pulse"
            style={{ background: "rgba(34,211,238,.25)" }}
          />
          {/* outer cyan stroke */}
          <div
            className="absolute inset-0 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.45)]
                        [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]
                        bg-gradient-to-br from-cyan-400 to-cyan-300"
          />
          {/* inner dark cutout */}
          <div
            className="absolute inset-[10px] rounded-[1.6rem] bg-[#0b1023]
                        [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
          />
          {/* image */}
          <img
            src={photo}
            alt="Profile"
            className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[1.4rem] object-cover
                       [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
            loading="lazy"
          />
        </div>

        {/* Right: content */}
        <div className="reveal-r text-center md:text-left">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            About <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="mt-2 text-xl font-bold">
            {role}
          </p>

          <p className="mt-5 leading-7 text-white/80">{about}</p>

          {/* Quick highlight pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {highlights.map((h, i) => (
              <span
                key={h}
                className="stagger text-xs md:text-sm px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/25"
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Info cards */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="stagger rounded-xl bg-[#0f172a] p-4 ring-1 ring-white/10" style={{ animationDelay: ".22s" }}>
              <p className="text-white/60 text-sm">Focus</p>
              <p className="mt-1 font-semibold">UX-first Frontend, Performance</p>
            </div>
            <div className="stagger rounded-xl bg-[#0f172a] p-4 ring-1 ring-white/10" style={{ animationDelay: ".29s" }}>
              <p className="text-white/60 text-sm">Toolbox</p>
              <p className="mt-1 font-semibold">React, Tailwind, Node/Express, MongoDB</p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#portfolio"
              className="btn-press relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3
                         font-semibold text-black shadow-lg hover:shadow-cyan-500/40 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-cyan-400"
              style={{
                background: "linear-gradient(90deg, rgba(34,211,238,1), rgba(20,184,166,1))",
              }}
            >
              <span className="relative z-[1]">Read More</span>
              <span className="shine" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Local keyframes for subtle motion & reveals */}
      <style>{`
        .reveal-l { opacity: 0; transform: translateY(16px) translateX(-10px); animation: kf-reveal .7s ease-out .1s forwards; }
        .reveal-r { opacity: 0; transform: translateY(16px) translateX(10px);  animation: kf-reveal .7s ease-out .18s forwards; }
        .stagger   { opacity: 0; transform: translateY(10px); animation: kf-reveal .6s ease-out forwards; }

        @keyframes kf-reveal {
          to { opacity: 1; transform: translateY(0) translateX(0); }
        }

        .float-anim { animation: kf-float 6s ease-in-out infinite; }
        @keyframes kf-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .glow-pulse { animation: kf-glow 3s ease-in-out infinite; }
        @keyframes kf-glow { 0%,100% { opacity:.55 } 50% { opacity:.85 } }

        .spin-slow { animation: kf-rotate 18s linear infinite; }
        @keyframes kf-rotate { to { transform: rotate(360deg) } }

        .btn-press { transform: translateZ(0); }
        .btn-press:active { transform: translateY(1px) scale(.995); }

        .shine {
          position:absolute; inset:0; border-radius:9999px;
          background:linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 35%, transparent 70%);
          transform: translateX(-120%);
          animation: kf-shine 2.4s ease-in-out infinite;
        }
        @keyframes kf-shine {
          0% { transform: translateX(-120%); }
          60%,100% { transform: translateX(120%); }
        }
      `}</style>
    </section>
  );
}
