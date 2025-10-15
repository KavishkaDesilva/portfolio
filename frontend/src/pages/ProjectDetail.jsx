import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TechStackShowcase from "../components/TechStackShowcase";

function getApiBase() {
  return process.env.REACT_APP_API_BASE || "http://localhost:5000";
}

// Fallback GitHub if a project doesn't have its own repo link
const GITHUB_USERNAME = "kavishka-ashan";

/* ------------------------------------------
   A single renderer so ALL curated projects
   look EXACTLY the same (same layout/sections)
-------------------------------------------*/
function StandardProjectSection({ data }) {
  return (
    <section className="mt-8">
      {/* Tagline & Stack */}
      <div className="rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-6 md:p-7">
        {data.name ? (
          <h2 className="text-xl md:text-2xl font-bold">{data.name}</h2>
        ) : null}
        <p className={`text-white/80 ${data.name ? "mt-2" : ""}`}>{data.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.stack.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/25"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Overview & What I Built */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-6">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-white/80 leading-7">{data.summaryA}</p>
        </div>
        <div className="rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-6">
          <h3 className="text-lg font-semibold mb-2">What I Built</h3>
          <p className="text-white/80 leading-7">{data.summaryB}</p>
        </div>
      </div>

      {/* Key Modules */}
      {!!data.modules?.length && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Key Modules</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.modules.map((m) => (
              <div
                key={m}
                className="rounded-xl bg-[#0f172a] ring-1 ring-white/10 px-4 py-3 text-white/85 hover:ring-cyan-400/30 transition"
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {!!data.highlights?.length && (
        <div className="mt-6 rounded-2xl bg-[#0f172a] ring-1 ring-white/10 p-6">
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <ul className="list-disc ps-6 text-white/80 leading-7">
            {data.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const API = getApiBase();

  // Prefer the project object passed via <Link state={{ project }} />
  const [project, setProject] = useState(state?.project || null);
  const [loading, setLoading] = useState(!state?.project);

  // Deep-link or refresh → fetch by :id
  useEffect(() => {
    if (project) return;
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/projects/${id}`);
        if (!ignore && res.ok) setProject(await res.json());
      } catch {
        // ignore
      }
      if (!ignore) setLoading(false);
    })();
    return () => {
      ignore = true;
    };
  }, [API, id, project]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="animate-pulse text-white/70">Loading project…</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-white/70">Project not found.</div>
      </div>
    );
  }

  // Build GitHub URL: repo if provided, else profile
  const githubUrl =
    project.github || project.githubRepo || `https://github.com/${GITHUB_USERNAME}`;

  // --------- Detection (title or slug) ----------
  const title = project.title || "";
  const slug = project.slug || "";

  const isVSMS =
    /vehicle service management system/i.test(title) ||
    /vehicle[- ]service[- ]management/i.test(slug);

  const isMoAItPortal =
    /it portal|ministry.*(it|portal|booking)|conference.*(hall|room).*booking/i.test(title) ||
    /ministry.*(it|portal|booking)|conference.*(hall|room).*booking/i.test(slug);

  const isTrain =
    /train.*reservation/i.test(title) ||
    /train.*reservation/i.test(slug);

  // --------- Curated content (ALL use the SAME renderer) ----------
  const VSMS = {
    name: "Vehicle Service Management System",
    tagline:
      "A web-based platform that centralizes day-to-day operations for a vehicle service centre.",
    stack: ["MERN Stack", "Express JS", "Node JS", "MongoDB", "Tailwind CSS", "GitHub", "Git"],
    summaryA:
      "Vehicle Service Management System is a web-based application designed for a Vehicle service centre, offering customer management, employee management, appointment management, finance management, supplier management, stock management, and payment management — leveraging the advantages of a modern online system.",
    summaryB:
      "Developed a comprehensive web-based management system for a car service center to streamline operations including inventory, customer, employee, and finance management. Implemented modules for appointment scheduling, payment tracking, and internal notifications using RESTful APIs.",
    modules: [
      "Customer Management",
      "Employee Management",
      "Appointment Scheduling",
      "Payment Management",
      "Finance/Revenue Tracking",
      "Supplier Management",
      "Stock/Inventory",
      "Notifications",
      "Reports & Insights",
    ],
    highlights: [
      "Role-based access for admins, staff, and finance",
      "RESTful API with clear resource boundaries",
      "Validation & consistent error handling",
      "Responsive UI/UX with Tailwind CSS",
      "Scalable MongoDB models for bookings, invoices, stock",
    ],
  };

  const IT_PORTAL = {
    name: "IT Portal – Ministry of Agriculture",
    tagline:
      "A modern portal that automates meeting room bookings and IT service requests—replacing manual workflows and improving operational efficiency across the Ministry.",
    stack: [
      "React.js",
      "Node.js (Express)",
      "MongoDB",
      "Tailwind CSS",
      "RESTful APIs",
      "Chrome DevTools",
      "GitHub",
      "Git",
    ],
    summaryA:
      "The portal streamlines internal operations: officers can check availability, request rooms with required IT support, and receive confirmations. It replaces manual, paper-based processes with auditable digital flows. Features include automated notifications, user profiles, and a conference hall booking system tailored to the Ministry’s operations.",
    summaryB:
      "I led design, development, and testing using React, Express, and MongoDB. I ran diagnostic tests for network connectivity, configured new hardware, and handled system software updates. Weekly feedback and rigorous QA (with Chrome DevTools for profiling and debugging) improved performance and reduced support response times during critical meetings.",
    modules: [
      "Conference Hall / Meeting Room Booking",
      "IT Service Requests & Automated Notifications",
      "User Profiles & Role-Based Access",
      "Equipment & Support Requirements (projectors, laptops)",
      "Admin Scheduling & Approvals",
      "Exportable Confirmations (PDF / Print)",
      "Dashboard & Usage Insights",
      "Request History & Audit Logs",
      "Inventory Hooks for Room Equipment",
    ],
    highlights: [
      "Manual processes → trackable, auditable digital workflows",
      "Automated notifications reduce ad-hoc calls and delays",
      "Performance fixes via structured debugging & profiling",
      "Weekly review cycles improved UX and reliability",
      "Noticeable reduction in incident response time",
    ],
  };

  // Train Ticket Reservation System (same structure & look)
  const TRAIN = {
    name: "Train Ticket Reservation System",
    tagline:
      "A Java-based ticketing platform to search routes, manage trains & stations, and reserve seats with validation and secure data handling.",
    stack: [
      "Java",
      "JSP / Servlets",
      "MVC",
      "JDBC",
      "SQL (MySQL)",
      "HTML/CSS",
      "GitHub",
      "Git",
    ],
    summaryA:
      "Train Ticket Reservation System is a web application built with Java web technologies. The system covers core site features such as authentication, search, and robust form validations. Domain features include managing stations, destinations, and trains, along with a booking workflow and administrative controls.",
    summaryB:
      "Engineered using OOP and MVC principles to keep controllers, services, and DAOs cleanly separated. SQL/JDBC is used for persistence and transaction safety. I also iterated with a desktop-style prototype while finalizing the web flows to validate MVC and design patterns.",
    modules: [
      "User Authentication & Profiles",
      "Station / Destination Management",
      "Train Management (CRUD)",
      "Trip Schedules & Seat Maps",
      "Search & Availability",
      "Booking & Cancellations",
      "Payments / Receipts (extensible)",
      "Admin Dashboard & Reports",
      "Validation & Error Handling",
    ],
    highlights: [
      "Strict MVC layering (Controllers / Services / DAO)",
      "Clean OOP modeling for Trains, Trips, Tickets, Users",
      "JDBC with prepared statements & transactions",
      "Form validation and user-friendly error states",
      "Search performance tuned with indexed queries",
    ],
  };

  // Choose a TOP 5 tech set for the visual block
  const TOP5_MERN = ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"];
  const TOP5_JAVA = ["Java", "JSP / Servlets", "JDBC", "MySQL", "Git"];
  const chosenTop5 = isTrain ? TOP5_JAVA : TOP5_MERN; // default MERN unless Train project

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-full ring-1 ring-white/15 hover:ring-cyan-400/40
                   text-white/80 hover:text-white transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl md:text-4xl font-extrabold">{project.title}</h1>
      <p className="text-white/70 mt-2">{project.description}</p>

      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="mt-6 w-full h-[340px] md:h-[460px] object-cover rounded-2xl ring-1 ring-white/10"
        />
      ) : null}

      {/* NEW: Visual Top 5 Tech block */}
      <TechStackShowcase stacks={chosenTop5} max={5} />

      {/* IDENTICAL LOOK for curated pages */}
      {isVSMS && <StandardProjectSection data={VSMS} />}
      {isMoAItPortal && <StandardProjectSection data={IT_PORTAL} />}
      {isTrain && <StandardProjectSection data={TRAIN} />}

      {/* Optional meta from API (badges) */}
      {project.tech?.length ? (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/12 text-cyan-300 ring-1 ring-cyan-400/25"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Generic details fallback */}
      <div className="mt-6 space-y-4 text-white/80 leading-7">
        <p>
          {project.longDescription ||
            "This project page can include goals, features, challenges, and what you learned. Add more fields in the backend if you want."}
        </p>
        {project.features?.length ? (
          <ul className="list-disc ps-6">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* GitHub buttons */}
      <div className="mt-8 flex gap-4">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 rounded-full bg-cyan-500 text-black font-semibold shadow hover:shadow-cyan-500/40 transition"
          title="Open on GitHub"
        >
          GitHub
        </a>

        {project.github && (
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full ring-1 ring-white/15 hover:ring-cyan-400/40 transition"
            title="Open GitHub Profile"
          >
            GitHub Profile
          </a>
        )}
      </div>
    </div>
  );
}
