{/* Services (new UI, uses the same `services` data) */}
<section id="services" className="py-24 bg-[#0b1220]">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-center mb-12">
      Our <span className="text-cyan-400">Services</span>
    </h2>

    {/*
      If your backend has 0 services, we show 3 defaults so the UI matches the design.
      If you *do* have services from the API, those will be used instead.
    */}
    {(() => {
      const defaults = [
        { title: "Web Development",    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum? Dolore culpa eius possimus fugit reprehenderit aperiam eveniet." },
        { title: "Graphic Design",     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum? Dolore culpa eius possimus fugit reprehenderit aperiam eveniet." },
        { title: "Digital Marketing",  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quia voluptas nostrum? Dolore culpa eius possimus fugit reprehenderit aperiam eveniet." },
      ];
      const data = services?.length ? services : defaults;
      const Icons = [LuCode2, LuPenTool, LuBarChart3];

      return (
        <div className="grid gap-8 md:grid-cols-3">
          {data.map((s, i) => {
            const Icon = Icons[i % Icons.length];
            const featured = i === 0; // left card highlight like screenshot
            return (
              <div
                key={i}
                className={[
                  "rounded-2xl bg-[#111827] p-8 text-center transition-all",
                  "border",
                  featured
                    ? "border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.30)]"
                    : "border-white/10",
                  "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
                ].join(" ")}
              >
                <div className="w-14 h-14 mx-auto mb-5 grid place-items-center rounded-xl bg-cyan-500/10">
                  <Icon className="text-3xl text-cyan-400" />
                </div>

                <h3 className="text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-3 text-white/70 leading-7">
                  {s.description}
                </p>

                <button
                  className="mt-6 inline-block px-6 py-2 rounded-full bg-cyan-500 text-black font-semibold
                             shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      );
    })()}
  </div>
</section>
