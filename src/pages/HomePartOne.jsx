/* ============================================================================
   HomePartOne.jsx — MAIN homepage entry point
   ============================================================================
   Sections: Hero → About → Skills → Projects
   Then automatically renders <HomePartTwo /> at the bottom which contains:
                              Services → Contact → BackToTop

   ✅ Fully responsive (mobile → tablet → laptop → desktop)
   ✅ All original logic preserved — zero changes
   ✅ Footer code removed (you already have a separate Footer component)
   ✅ Shared data (services, contact cards) is exported from here
      so HomePartTwo can import it — no third file needed
   ✅ Hero + About images upgraded to professional Unsplash developer photos
   ============================================================================ */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icons
import {
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaRocket,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaStar,
  FaSearch,
  FaTimes,
  FaSort,
  FaChevronDown,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiReact, SiExpress, SiMongodb, SiNodedotjs } from "react-icons/si";
import {
  HiGlobeAlt,
  HiCog6Tooth,
  HiRocketLaunch,
  HiDevicePhoneMobile,
  HiPaintBrush,
  HiWrenchScrewdriver,
} from "react-icons/hi2";

// Part 2 (rendered at bottom automatically)
import HomePartTwo from "./HomePartTwo";

/* ============================================================================
   PROFESSIONAL DEVELOPER IMAGES (from Unsplash — free for commercial use)
   ============================================================================ */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=900&q=85";
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=85";

/* ============================================================================
   SHARED DATA — exported for HomePartTwo to import
   ============================================================================ */

export const servicesData = [
  {
    id: 1,
    title: "Frontend Development",
    icon: HiGlobeAlt,
    description:
      "Create modern, responsive, and visually appealing user interfaces that provide seamless experiences across all devices.",
    services: [
      "Responsive Website Development",
      "React Applications",
      "Modern UI Implementation",
      "Landing Pages",
      "Portfolio Websites",
      "Performance Optimization",
    ],
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.3)",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/50",
  },
  {
    id: 2,
    title: "Backend Development",
    icon: HiCog6Tooth,
    description:
      "Build secure, scalable, and efficient server-side systems designed to support modern applications and business operations.",
    services: [
      "REST API Development",
      "Authentication & Authorization",
      "Database Design",
      "Server Architecture",
      "API Integration",
      "Performance Optimization",
    ],
    gradient: "from-green-500 to-emerald-600",
    glowColor: "rgba(34, 197, 94, 0.3)",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    borderHover: "hover:border-green-500/50",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    icon: HiRocketLaunch,
    description:
      "Develop complete web applications from frontend to backend with a focus on scalability, performance, and maintainability.",
    services: [
      "MERN Stack Applications",
      "Dashboard Systems",
      "Business Management Platforms",
      "E-commerce Solutions",
      "Content Management Systems",
      "Custom Web Applications",
    ],
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.3)",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
  },
  {
    id: 4,
    title: "Mobile App Development",
    icon: HiDevicePhoneMobile,
    description:
      "Build modern mobile applications that deliver smooth performance and exceptional user experiences.",
    services: [
      "Cross-Platform Applications",
      "React Native Development",
      "Mobile UI Development",
      "API Integration",
      "Performance Optimization",
      "App Maintenance",
    ],
    gradient: "from-purple-500 to-violet-600",
    glowColor: "rgba(168, 85, 247, 0.3)",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/50",
  },
  {
    id: 5,
    title: "UI Implementation & Responsive Design",
    icon: HiPaintBrush,
    description:
      "Transform ideas and designs into beautiful, responsive, and accessible digital experiences.",
    services: [
      "Responsive Layout Design",
      "Modern Component Systems",
      "Interactive Interfaces",
      "User Experience Enhancement",
      "Accessibility Improvements",
      "Cross-Device Compatibility",
    ],
    gradient: "from-pink-500 to-rose-600",
    glowColor: "rgba(236, 72, 153, 0.3)",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    borderHover: "hover:border-pink-500/50",
  },
  {
    id: 6,
    title: "Website & Mobile App Maintenance & Optimization",
    icon: HiWrenchScrewdriver,
    description:
      "Ensure applications remain secure, updated, fast, and reliable through continuous support and optimization.",
    services: [
      "Bug Fixes",
      "Performance Improvements",
      "Feature Enhancements",
      "Security Updates",
      "Code Refactoring",
      "Technical Support",
    ],
    gradient: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.3)",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/50",
  },
];

export const contactCards = [
  {
    id: 1,
    type: "WhatsApp",
    icon: FaWhatsapp,
    value: "+2349130593550",
    rawValue: "2349130593550",
    buttonText: "Chat on WhatsApp",
    href: "https://wa.me/2349130593550",
    isExternal: true,
    gradient: "from-green-500 to-emerald-600",
    glowColor: "rgba(34, 197, 94, 0.3)",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    borderHover: "hover:border-green-500/50",
    btnGradient: "from-green-600 to-emerald-600",
  },
  {
    id: 2,
    type: "Phone Call",
    icon: FaPhoneAlt,
    value: "+2349156480871",
    rawValue: "+2349156480871",
    buttonText: "Call Now",
    href: "tel:+2349156480871",
    isExternal: false,
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.3)",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
    btnGradient: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    type: "Email",
    icon: FaEnvelope,
    value: "favourabel150@gmail.com",
    rawValue: "favourabel150@gmail.com",
    buttonText: "Send Email",
    href: "mailto:favourabel150@gmail.com",
    isExternal: false,
    gradient: "from-purple-500 to-violet-600",
    glowColor: "rgba(168, 85, 247, 0.3)",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/50",
    btnGradient: "from-purple-600 to-violet-600",
  },
];

/* ==================== SKILLS (local to Part One) ==================== */
const skills = [
  {
    title: "Frontend Development",
    icon: "💻",
    skills: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "JavaScript",
      "React.js",
      "React Router",
      "Framer Motion",
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Authentication",
      "Authorization",
      "Bcrypt",
      "Multer",
      "CROS",
      "Socket.io",
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: ["MongoDB", "Mongoose", "Supabase", "MySQL"],
  },
  {
    title: "Mobile Development",
    icon: "📱",
    skills: [
      "React Native",
      "Expo",
      "React Navigation",
      "AsyncStorage",
      "Native APIs",
      "Push Notifications",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "🛠️",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "NPM",
      "AI",
      "Vite",
      "ESLint",
      "Prettier",
    ],
  },
  {
    title: "Cloud & Deployment",
    icon: "☁️",
    skills: ["Vercel", "Netlify", "Render", "Cloudinary"],
  },
];

/* ==================== UTILITY FUNCTIONS (original — unchanged) ==================== */
const filterProjects = (projects, category) => {
  if (category === "All") return projects;
  if (category === "Featured") return projects.filter((p) => p.featured);
  return projects.filter((p) => p.category === category);
};

const sortProjects = (projects, sortType) => {
  const sorted = [...projects];
  if (sortType === "Newest First") {
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const searchProjects = (projects, searchTerm) => {
  if (!searchTerm.trim()) return projects;
  const term = searchTerm.toLowerCase();
  return projects.filter(
    (project) =>
      project.title?.toLowerCase().includes(term) ||
      project.description?.toLowerCase().includes(term) ||
      (project.technologies || []).some((tech) =>
        tech.toLowerCase().includes(term)
      ) ||
      (project.keywords || []).some((keyword) =>
        keyword.toLowerCase().includes(term)
      )
  );
};

const getTechnologyColor = (tech) => {
  const colors = {
    React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    "Node.js": "bg-green-500/10 text-green-400 border-green-500/30",
    "Express.js": "bg-gray-500/10 text-gray-300 border-gray-500/30",
    MongoDB: "bg-green-600/10 text-green-500 border-green-600/30",
    "Tailwind CSS": "bg-sky-500/10 text-sky-400 border-sky-500/30",
    JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "Next.js": "bg-white/10 text-white border-white/30",
    Redux: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    Firebase: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    MySQL: "bg-blue-600/10 text-blue-500 border-blue-600/30",
    "React Native": "bg-cyan-600/10 text-cyan-500 border-cyan-600/30",
    Expo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    "Framer Motion": "bg-pink-500/10 text-pink-400 border-pink-500/30",
    Vite: "bg-purple-600/10 text-purple-500 border-purple-600/30",
    JWT: "bg-red-500/10 text-red-400 border-red-500/30",
  };
  return colors[tech] || "bg-blue-500/10 text-blue-400 border-blue-500/30";
};

/* ============================================================================
   UI-ONLY HOOK — Scroll reveal for entrance animations (pure visual, no logic)
   ============================================================================ */
const useScrollReveal = (delay = 0) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, isVisible];
};

/* ============================================================================
   UI-ONLY COMPONENTS — Pure visual, zero logic changes
   ============================================================================ */

/* ── Section Header ── */
const SectionHeader = ({ eyebrow, title, highlight, description }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`mb-16 text-center transition-all duration-1000 ease-out lg:mb-20 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/5 px-5 py-2.5 backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
        <span className="text-xs font-semibold uppercase tracking-[4px] text-blue-400">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
          {description}
        </p>
      )}
      <div className="mx-auto mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
      </div>
    </div>
  );
};

/* ── Stat Card (About section) ── */
const StatCard = ({ icon: Icon, value, label }) => (
  <div className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] sm:p-6">
    <div className="mb-3 flex justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500/20">
        <Icon
          className="text-blue-400 transition-transform duration-500 group-hover:rotate-12"
          size={22}
        />
      </div>
    </div>
    <h4 className="text-2xl font-extrabold text-white transition-colors duration-300 group-hover:text-blue-400">
      {value}
    </h4>
    <p className="mt-1 text-sm text-gray-400">{label}</p>
  </div>
);

/* ── Skill Category Card ── */
const SkillCard = ({ category, index }) => {
  const [ref, isVisible] = useScrollReveal(index * 100);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_20px_60px_rgba(59,130,246,0.2)] sm:p-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Glow orb */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-600/10 blur-[80px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative mb-5 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600/30">
          {category.icon}
        </div>
        <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-xl">
          {category.title}
        </h3>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="cursor-default rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-600/20 hover:text-white hover:scale-105 sm:px-4 sm:py-2 sm:text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 group-hover:w-full" />
    </div>
  );
};

/* ── Floating Tech Badge (Hero) ── */
const TechBadge = ({ icon: Icon, label, color, className, animation }) => (
  <div
    className={`absolute hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl backdrop-blur-lg md:block ${animation} ${className}`}
  >
    <Icon size={36} className={color} />
    <p className="mt-2 text-center text-xs font-semibold text-gray-300">
      {label}
    </p>
  </div>
);

/* ── Project Card ── */
const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useScrollReveal(index * 100);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/60 to-slate-900/90 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-3 hover:border-blue-500/50 hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Top accent line */}
      <div className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 backdrop-blur-md">
          <FaStar className="text-yellow-400" size={11} />
          <span className="text-xs font-bold tracking-wide text-yellow-400">
            FEATURED
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category & Date */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            {project.category}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(project.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300 sm:text-2xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-7 text-gray-400 sm:text-base">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-300 hover:scale-105 sm:px-3 ${getTechnologyColor(
                tech
              )}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ✅ Links — original smart Frontend + Backend layout, preserved exactly */}
        <div className="mt-auto space-y-3 sm:space-y-4">
          {/* Frontend Links */}
          {(project.githubLink || project.liveLink) && (
            <div>
              {(project.backendGithubLink || project.backendLiveLink) && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  🎨 Frontend
                </p>
              )}
              <div className="flex gap-3 sm:gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 sm:py-3"
                  >
                    <FaGithub size={15} />
                    <span>Code</span>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 sm:py-3"
                  >
                    <FaExternalLinkAlt size={12} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Backend Links — only show if they exist */}
          {(project.backendGithubLink || project.backendLiveLink) && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                ⚙️ Backend
              </p>
              <div className="flex gap-3 sm:gap-4">
                {project.backendGithubLink && (
                  <a
                    href={project.backendGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30 sm:py-3"
                  >
                    <FaGithub size={15} />
                    <span>Code</span>
                  </a>
                )}
                {project.backendLiveLink && (
                  <a
                    href={project.backendLiveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/50 sm:py-3"
                  >
                    <FaExternalLinkAlt size={12} />
                    <span>Live API</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */
export default function HomePartOne() {
  const navigate = useNavigate();

  /* ==================== STATE (original — zero changes) ==================== */
  const [projectsData, setProjectsData] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortType, setSortType] = useState("Newest First");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  /* ==================== SMOOTH SCROLL (original — zero changes) ==================== */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ==================== FETCH PROJECTS (original — zero changes) ==================== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const { data } = await axios.get(`${apiUrl}/projects`);

        const normalized = data.map((p) => ({
          id: p._id,
          title: p.title,
          description: p.description,
          category: p.category || "Full Stack",
          date: p.date || p.createdAt,
          image: p.image,
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          githubLink: p.codeUrl || "",
          liveLink: p.liveUrl || "",
          backendGithubLink: p.backendCodeUrl || "",
          backendLiveLink: p.backendLiveUrl || "",
          featured: p.featured || false,
          keywords: [],
        }));

        setProjectsData(normalized);
        setProjectsError("");
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjectsError("Failed to load projects. Please try again later.");
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ==================== FILTER / SORT / SEARCH (original — zero changes) ==================== */
  useEffect(() => {
    let filtered = filterProjects(projectsData, activeCategory);
    filtered = searchProjects(filtered, searchTerm);
    filtered = sortProjects(filtered, sortType);
    setDisplayedProjects(filtered);
    setVisibleCount(6);
  }, [activeCategory, sortType, searchTerm, projectsData]);

  /* ==================== HANDLERS (original — zero changes) ==================== */
  const handleSearch = (value) => setSearchTerm(value);
  const clearSearch = () => setSearchTerm("");
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  };
  const handleSortSelect = (option) => {
    setSortType(option);
    setSortDropdownOpen(false);
  };

  const visibleProjects = displayedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < displayedProjects.length;

  const categories = [
    "All",
    "Featured",
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
  ];
  const sortOptions = ["Newest First", "Oldest First"];

  /* ==================== RENDER ==================== */
  return (
    <>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-[#020617] text-white"
      >
        {/* Layered background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-150px] top-[-200px] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />
          <div className="absolute bottom-[-150px] left-[-150px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[130px]" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[160px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Hero Content */}
        <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center gap-12 px-6 pt-28 lg:flex-row lg:gap-20 lg:pt-32">

          {/* ── LEFT COLUMN ── */}
          <div className="z-10 flex-1 text-center lg:text-left">

            {/* Availability badge with ping animation */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/25 bg-blue-500/5 px-5 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[4px] text-blue-400">
                MERN & React Native Developer
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Osifo Favour
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Osarunmwnese
              </span>
            </h1>

            {/* Role */}
            <h2 className="mt-5 text-xl font-medium text-gray-300 sm:text-2xl">
              Junior Full-Stack & Mobile Developer
              <span className="mx-2 text-blue-500">·</span>
              MERN Stack + React Native
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-400 lg:mx-0 lg:text-lg">
              I build modern, responsive, and scalable web and mobile
              applications using the MERN stack and React Native. Through{" "}
              <span className="font-semibold text-blue-400">
                SJ Web Solutions
              </span>
              , I turn ideas into seamless digital experiences powered by clean
              code, creative problem-solving, and modern technology.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40"
              >
                View My Work
              </button>
              <button
                onClick={() => navigate("/resume")}
                className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10"
              >
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex justify-center gap-4 lg:justify-start">
              {[
                { icon: FaGithub, href: "#" },
                { icon: FaLinkedin, href: "#" },
                { icon: FaEnvelope, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white sm:h-14 sm:w-14"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Avatar + Floating Badges ── */}
          <div className="relative flex flex-1 items-center justify-center">
            {/* Glow behind avatar */}
            <div className="absolute h-[380px] w-[380px] rounded-full bg-blue-600/20 blur-[130px] lg:h-[480px] lg:w-[480px]" />

            {/* Avatar card */}
            <div className="relative rounded-[36px] border border-blue-500/20 bg-slate-900/50 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <img
                src={HERO_IMAGE}
                alt="Osifo Favour — MERN & React Native Developer"
                className="w-[260px] rounded-3xl object-cover shadow-2xl sm:w-[320px] md:w-[360px] lg:w-[400px]"
              />
              {/* Subtle overlay on image */}
              <div className="pointer-events-none absolute inset-5 rounded-3xl bg-gradient-to-t from-blue-600/10 to-transparent sm:inset-6" />
            </div>

            {/* Floating tech badges */}
            <TechBadge
              icon={SiReact}
              label="React"
              color="text-cyan-400"
              animation="animate-bounce"
              className="-left-14 top-8"
            />
            <TechBadge
              icon={SiNodedotjs}
              label="Node.js"
              color="text-green-500"
              animation="animate-pulse"
              className="-right-16 top-28"
            />
            <TechBadge
              icon={SiExpress}
              label="Express"
              color="text-gray-300"
              animation="animate-bounce"
              className="-left-16 bottom-28"
            />
            <TechBadge
              icon={SiMongodb}
              label="MongoDB"
              color="text-green-500"
              animation="animate-pulse"
              className="-right-12 bottom-8"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[5px] text-gray-500">
              Scroll
            </span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <div className="h-2 w-1 animate-bounce rounded-full bg-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ABOUT SECTION
          ================================================================ */}
      <section
        id="about"
        className="relative overflow-hidden bg-[#020617] px-6 py-24 text-white lg:py-32"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[5%] top-[15%] h-[350px] w-[350px] rounded-full bg-blue-600/[0.05] blur-[150px]" />
          <div className="absolute bottom-[15%] right-[5%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="About Me"
            title="Get To Know"
            highlight="Me"
          />

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* ── Image Column ── */}
            <div className="relative flex justify-center">
              <div className="absolute h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[130px] lg:h-[420px] lg:w-[420px]" />
              <div className="relative rounded-[32px] border border-blue-500/20 bg-slate-900/50 p-5 shadow-2xl backdrop-blur-xl">
                <img
                  src={ABOUT_IMAGE}
                  alt="Modern developer workspace"
                  className="w-full max-w-[480px] rounded-3xl lg:w-[500px]"
                />
                <div className="pointer-events-none absolute inset-5 rounded-3xl bg-gradient-to-t from-blue-600/10 to-transparent" />
              </div>
              {/* Role badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 shadow-xl shadow-blue-600/30">
                <p className="text-sm font-bold tracking-wide">
                  MERN & React Native Developer
                </p>
              </div>
            </div>

            {/* ── Text Column ── */}
            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-blue-400">
                Who Am I?
              </p>
              <h3 className="mb-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Osifo Favour Osarunmwnese
                </span>
              </h3>
              <h4 className="mb-6 text-lg font-medium text-gray-300 sm:text-xl">
                Junior MERN & React Native JavaScript Developer
              </h4>

              <p className="mb-5 text-base leading-8 text-gray-400">
                I am a passionate Junior MERN Stack Developer focused on
                building modern, scalable and user-friendly web applications. I
                enjoy solving problems, learning new technologies, and creating
                digital experiences that make a real impact.
              </p>

              <p className="mb-8 text-base leading-8 text-gray-400">
                <span className="font-bold text-blue-400">
                  SJ Web Solutions (SJWS)
                </span>{" "}
                was founded on the 15th of May, 2026. The brand began when the
                founder designed the first SJWwebs logo. With a vision of
                helping businesses, startups and individuals transform their
                ideas into powerful digital solutions through modern web
                technologies.
              </p>

              {/* Statistics Grid */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                <StatCard icon={FaProjectDiagram} value="4+" label="Projects" />
                <StatCard icon={FaLaptopCode} value="MERN" label="Stack" />
                <StatCard icon={FaCode} value="15+" label="Technologies" />
                <StatCard icon={FaRocket} value="Available" label="For Work" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40">
                  Download CV
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SKILLS SECTION
          ================================================================ */}
      <section
        id="skills"
        className="relative overflow-hidden bg-[#020617] px-6 py-24 text-white lg:py-32"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
          <div className="absolute bottom-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="My Skills"
            title="Technologies &"
            highlight="Expertise"
            description="Technologies and tools I use to build modern web and mobile applications."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((category, index) => (
              <SkillCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROJECTS SECTION
          ================================================================ */}
      <section
        id="projects"
        className="relative overflow-hidden bg-[#020617] px-6 py-24 text-white lg:py-32"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
          <div className="absolute bottom-[10%] right-[5%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="My Work"
            title="Featured"
            highlight="Projects"
            description="Explore my latest projects built with modern technologies and best practices. Each project demonstrates my skills in creating scalable, user-friendly applications."
          />

          {/* ── Search Bar (original logic, upgraded UI) ── */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <FaSearch
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by project name, technology, or keyword..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-4 text-sm text-white placeholder-gray-500 backdrop-blur-lg transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                style={{ paddingLeft: "3.25rem", paddingRight: "3.25rem" }}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-white"
                >
                  <FaTimes size={16} />
                </button>
              )}
            </div>
          </div>

          {/* ── Filters & Sort (original logic, upgraded UI) ── */}
          <div className="mb-12 flex flex-col items-center justify-between gap-5 lg:flex-row">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    activeCategory === category
                      ? "scale-105 border-blue-500 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "border-white/10 bg-white/5 text-gray-300 backdrop-blur-sm hover:border-blue-500/50 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50"
              >
                <FaSort className="text-blue-400" size={14} />
                <span>{sortType}</span>
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    sortDropdownOpen ? "rotate-180" : ""
                  }`}
                  size={12}
                />
              </button>

              {sortDropdownOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className={`w-full px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                        sortType === option
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Projects Grid (original logic, upgraded UI) ── */}
          {projectsLoading ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : projectsError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center text-red-400">
              {projectsError}
            </div>
          ) : visibleProjects.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>

              {/* Load More Button (original logic, upgraded UI) */}
              {hasMore && (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaRocket className="transition-transform duration-300 group-hover:-translate-y-1" />
                        <span>Load More Projects</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ── Empty State (original logic, upgraded UI) ── */
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-sm">
                <FaRocket className="text-blue-500" size={36} />
              </div>
              <h3 className="mb-3 text-2xl font-bold">No Projects Found</h3>
              <p className="mx-auto max-w-md text-base text-gray-400">
                No projects match your current search or filter criteria. Try
                adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="mt-8 rounded-2xl border border-blue-500/50 bg-blue-500/10 px-8 py-3 text-sm font-bold text-blue-400 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ✅ Automatically renders bottom half — no App.jsx changes needed */}
      <HomePartTwo />
    </>
  );
}