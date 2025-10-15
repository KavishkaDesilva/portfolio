// src/components/Hero.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function forceDownload(url, filename = "resume.pdf") {
  fetch(url, { mode: "cors" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    })
    .catch((err) => {
      console.error("CV download failed:", err);
      window.open(url, "_blank", "noopener,noreferrer");
    });
}

export default function Hero({ profile }) {
  const name = profile?.name || "Kavishka De Silva";
  const role = profile?.role || "Undergraduated SLIIT Student";
  const about =
    profile?.about ||
    "I am a passionate IT undergraduate with a strong background in programming and software engineering. I have hands-on experience in web development, databases, and software projects, and I’m eager to apply my skills to contribute to innovative solutions.";

  const socials = profile?.socials?.length
    ? profile.socials
    : [
        { icon: <FaFacebookF />, link: "https://web.facebook.com/profile.php?id=100075079162686" },
        { icon: <FaTwitter />, link: "#" },
        { icon: <FaInstagram />, link: "#" },
        { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/kavishka-ashan-de-silva/" },
      ];

  const cvUrl = profile?.cv || `${process.env.PUBLIC_URL}/cv/Kavishka-De-Silva-CV.pdf`;
  const cvFileName = profile?.cvName || "Kavishka-De-Silva-CV.pdf";

  return (
    <section id="home" className="relative overflow-hidden bg-[#0b1023]">
      {/* Soft gradient lights (decor) */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
           style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,.35), transparent)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
           style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(147,51,234,.25), transparent)" }} />

      <div className="max-w-6xl mx-auto grid items-center gap-12 px-6 pt-28 pb-20 md:grid-cols-2">
        {/* Text block */}
        <div className="reveal">
          <p className="text-white/80 text-lg">Hello, It's Me</p>

          <h1 className="mt-2 text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {/* first + last line stack with subtle gradient */}
            <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#fff,rgba(255,255,255,.85))" }}>
              {name.split(" ").slice(0, -1).join(" ")}
            </span>{" "}
            <span className="block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#a78bfa)" }}>
              {name.split(" ").slice(-1)}
            </span>
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
            And I'm a{" "}
            <span className="font-extrabold bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#6ee7b7)" }}>
              {role}
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-white/75 leading-7">{about}</p>

          {/* Socials */}
          <div className="mt-7 flex gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="tilt group grid h-11 w-11 place-items-center rounded-full border border-cyan-400/50 text-cyan-300 transition
                           hover:-translate-y-0.5 hover:border-cyan-300 hover:text-black hover:shadow-lg
                           hover:shadow-cyan-500/25"
                style={{ background: "linear-gradient(180deg, rgba(34,211,238,.12), rgba(34,211,238,.05))" }}
                title="Open"
              >
                <span className="transition group-hover:scale-110">{s.icon}</span>
              </a>
            ))}
          </div>

          {/* Download CV */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => forceDownload(cvUrl, cvFileName)}
              className="btn-press relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold
                         text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                         shadow-lg hover:shadow-cyan-500/40"
              style={{
                background:
                  "linear-gradient(90deg, rgba(34,211,238,1), rgba(20,184,166,1))",
              }}
            >
              <span className="relative z-[1]">Download CV</span>
              {/* shine sweep */}
              <span className="shine" aria-hidden />
            </button>

            {/* Optional secondary action (scroll to portfolio) */}
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-full px-6 py-3 text-cyan-300 ring-1 ring-white/15 transition
                         hover:text-white hover:ring-cyan-400/40"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Photo block */}
        <div className="relative mx-auto h-[320px] w-[270px] float-anim md:h-[380px] md:w-[320px]">
          {/* rotating gradient ring */}
          <span
            className="absolute -inset-7 -z-10 rounded-[2rem] spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(34,211,238,.35), rgba(167,139,250,.35), rgba(34,211,238,.35))",
              WebkitMask:
                "radial-gradient(transparent 60%, #000 61%)",
              mask: "radial-gradient(transparent 60%, #000 61%)",
            }}
          />
          {/* glow */}
          <div className="absolute -inset-6 -z-10 rounded-[2rem] blur-3xl glow-pulse"
               style={{ background: "rgba(34,211,238,.25)" }} />
          {/* cyan frame */}
          <div className="absolute inset-0 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.5)]
                          [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]
                          bg-gradient-to-br from-cyan-400 to-cyan-300" />
          {/* image */}
          <img
            src="/kavishka.png"
            alt="Me"
            className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[1.4rem] object-cover
                       [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]"
          />
        </div>
      </div>

      {/* Local CSS animations (no extra packages) */}
      <style>{`
        /* enter animation */
        .reveal { 
          opacity: 0; transform: translateY(16px);
          animation: kf-reveal .7s ease-out .15s forwards;
        }
        @keyframes kf-reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* floating card motion */
        .float-anim { animation: kf-float 6s ease-in-out infinite; }
        @keyframes kf-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        /* subtle glow pulsing */
        .glow-pulse { animation: kf-glow 3s ease-in-out infinite; }
        @keyframes kf-glow {
          0%, 100% { opacity: .55; }
          50% { opacity: .85; }
        }

        /* slow rotating conic ring */
        .spin-slow { animation: kf-rotate 18s linear infinite; }
        @keyframes kf-rotate { to { transform: rotate(360deg); } }

        /* button press micro-interaction */
        .btn-press { transform: translateZ(0); }
        .btn-press:active { transform: translateY(1px) scale(.995); }

        /* diagonal shine for button */
        .shine {
          position: absolute; inset: 0; border-radius: 9999px;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 30%, transparent 60%);
          transform: translateX(-120%);
          animation: kf-shine 2.4s ease-in-out infinite;
        }
        @keyframes kf-shine {
          0%   { transform: translateX(-120%); }
          60%  { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }

        /* slight parallax tilt on hover for round icons */
        .tilt { transition: transform .25s ease; }
        .tilt:hover { transform: translateY(-4px) rotate(-2deg) scale(1.03); }
      `}</style>
    </section>
  );
}
