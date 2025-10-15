import { Link } from "react-router-dom";

export default function ProjectsGrid({ projects = [] }) {
  // If API gave you data, use it; otherwise show 6 curated projects with local images.
  const data = projects.length
    ? projects
    : [
        {
          _id: "vsms",
          slug: "vehicle-service-management-system",
          title: "Vehicle Service Management System",
          description: "All-in-one web system for a vehicle service centre.",
          image: "/car.png", // from public/
          github: "https://github.com/kavishka-ashan",
        },
        {
          _id: "moa-portal",
          slug: "it-portal-ministry-of-agriculture",
          title: "IT Portal - Ministry of Agriculture",
          description: "Conference hall booking & IT requests automation.",
          image: "/IT.png", // from public/
          github: "https://github.com/kavishka-ashan",
        },
        {
          _id: "recruitment",
          slug: "recruitment-company-system",
          title: "Recruitment Company System",
          description: "Job postings, candidate pipeline, and HR tools.",
          image: "/company.png", // from public/
          github: "https://github.com/kavishka-ashan",
        },
        {
          _id: "train-reservation",
          slug: "train-reservation-system",
          title: "Train Reservation system",
          description: "Seat booking with schedules & user profiles.",
          image: "/train.png", // from public/
          github: "https://github.com/kavishka-ashan",
        },
        {
          _id: "bus-reservation",
          slug: "bus-reservation-system",
          title: "Bus reservation system",
          description: "Routes, seats, and fares for buses.",
          image: "/bus.png", // from public/
          github: "https://github.com/kavishka-ashan",
          tech: ["React", "Node", "MongoDB"],
          features: ["Operator portal", "Seat selection", "Reports"],
          longDescription:
            "Designed for bus operators with route management, schedules, seat selection, payment flows, and reporting.",
        },
        {
          _id: "workstation",
          slug: "workstation-setup",
          title: "Workstation",
          description: "My productive development setup.",
          image: "/train.png", // placeholder from public/
          github: "https://github.com/kavishka-ashan",
          tech: ["Hardware", "DevTools"],
          features: ["Multi-monitor", "Peripherals", "Optimized workflow"],
          longDescription:
            "A showcase of my desk setup and the developer tools I rely on daily for productivity, testing, and design.",
        },
      ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid gap-6 md:grid-cols-3">
        {data.map((p, i) => {
          const id = p._id ?? String(i);
          return (
            <Link
              key={id}
              to={`/project/${id}`}
              state={{ project: p }} // pass full object for instant detail page
              className="relative group rounded-2xl overflow-hidden block"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-56 md:h-48 object-cover rounded-2xl ring-1 ring-white/10 transition group-hover:opacity-90"
              />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition" />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-cyan-500 text-black shadow">
                  {p.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
