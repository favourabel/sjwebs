/* ============================================================================
   HomePartOne.jsx — MAIN homepage entry point
   ============================================================================
   Sections: Hero → About → Skills → Projects
   Then automatically renders <HomePartTwo /> at the bottom which contains:
                              Services → Contact → BackToTop

   ✅ Fully responsive (mobile → tablet → laptop → desktop)
   ✅ All original logic preserved
   ✅ Footer code removed (you already have a separate Footer component)
   ✅ Shared data (services, contact cards) is exported from here
      so HomePartTwo can import it — no third file needed
   ============================================================================ */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Assets
import AI from "../assets/AI.jpg";

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

/* ==================== UTILITY FUNCTIONS ==================== */
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
   MAIN COMPONENT
   ============================================================================ */
export default function HomePartOne() {
  const navigate = useNavigate();

  /* ==================== STATE ==================== */
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

  /* ==================== SMOOTH SCROLL ==================== */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ==================== FETCH PROJECTS ==================== */
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

  /* ==================== FILTER / SORT / SEARCH ==================== */
  useEffect(() => {
    let filtered = filterProjects(projectsData, activeCategory);
    filtered = searchProjects(filtered, searchTerm);
    filtered = sortProjects(filtered, sortType);
    setDisplayedProjects(filtered);
    setVisibleCount(6);
  }, [activeCategory, sortType, searchTerm, projectsData]);

  /* ==================== HANDLERS ==================== */
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
      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-[#020617] text-white"
      >
        {/* Background Glow */}
        <div className="absolute right-[-100px] top-[-150px] h-[250px] w-[250px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[200px] w-[200px] rounded-full bg-blue-500/10 blur-[120px] sm:h-[250px] sm:w-[250px] lg:h-[300px] lg:w-[300px]" />

        {/* Hero Content */}
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-10 px-4 pt-24 sm:px-6 sm:pt-28 md:gap-12 lg:flex-row lg:gap-16 lg:pt-32">
          {/* LEFT */}
          <div className="z-10 flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 sm:mb-8 sm:gap-3 sm:px-6 sm:py-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 sm:h-3 sm:w-3"></div>
              <span className="text-xs tracking-[2px] text-blue-400 sm:text-sm sm:tracking-[4px]">
                MERN & React Native DEVELOPER
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Osifo Favour
              <br />
              <span className="text-blue-500">Osarunmwnese</span>
            </h1>

            <h2 className="mt-4 text-lg text-gray-300 sm:mt-6 sm:text-xl md:text-2xl">
              Junior Full-Stack & Mobile Developer
              <br />
              MERN Stack + React Native.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:mt-8 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              I build modern, responsive, and scalable web and mobile
              applications using the MERN stack and React Native. Through SJ Web
              Solutions, I turn ideas into seamless digital experiences powered
              by clean code, creative problem-solving, and modern technology.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-5 lg:justify-start">
              <button
                onClick={() => scrollToSection("projects")}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:-translate-y-1 hover:bg-blue-500 sm:px-8 sm:py-4 sm:text-base"
              >
                View My Work
              </button>
              <button
                onClick={() => navigate("/resume")}
                className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold transition hover:border-blue-500 sm:px-8 sm:py-4 sm:text-base"
              >
                Download Resume
              </button>
            </div>

            {/* Socials */}
            <div className="mt-10 flex justify-center gap-4 sm:mt-12 sm:gap-5 lg:justify-start">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600 sm:h-14 sm:w-14"
              >
                <FaGithub size={20} className="sm:hidden" />
                <FaGithub size={24} className="hidden sm:block" />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600 sm:h-14 sm:w-14"
              >
                <FaLinkedin size={20} className="sm:hidden" />
                <FaLinkedin size={24} className="hidden sm:block" />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600 sm:h-14 sm:w-14"
              >
                <FaEnvelope size={20} className="sm:hidden" />
                <FaEnvelope size={24} className="hidden sm:block" />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute h-[280px] w-[280px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]" />
            <div className="relative rounded-[30px] border border-blue-500/20 bg-slate-900/50 p-4 backdrop-blur-lg sm:rounded-[40px] sm:p-6">
              <img
                src={AI}
                alt="Osifo Favour"
                className="w-[260px] rounded-2xl object-cover shadow-2xl sm:w-[320px] sm:rounded-3xl md:w-[380px] lg:w-[420px]"
              />

              {/* Floating tech badges — hidden on small screens */}
              <div className="absolute -left-12 top-10 hidden animate-bounce rounded-2xl border border-white/10 bg-slate-900 p-4 md:block md:p-5">
                <SiReact size={40} className="text-cyan-400" />
                <p className="mt-2 text-sm">React</p>
              </div>
              <div className="absolute -right-14 top-32 hidden animate-pulse rounded-2xl border border-white/10 bg-slate-900 p-4 md:block md:p-5">
                <SiNodedotjs size={40} className="text-green-500" />
                <p className="mt-2 text-sm">Node.js</p>
              </div>
              <div className="absolute -left-14 bottom-32 hidden animate-bounce rounded-2xl border border-white/10 bg-slate-900 p-4 md:block md:p-5">
                <SiExpress size={40} />
                <p className="mt-2 text-sm">Express</p>
              </div>
              <div className="absolute -right-10 bottom-10 hidden animate-pulse rounded-2xl border border-white/10 bg-slate-900 p-4 md:block md:p-5">
                <SiMongodb size={40} className="text-green-600" />
                <p className="mt-2 text-sm">MongoDB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10">
          <div className="animate-bounce text-xs tracking-[3px] text-gray-400 sm:text-sm sm:tracking-[5px]">
            SCROLL DOWN
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section
        id="about"
        className="bg-[#020617] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <p className="mb-2 text-sm tracking-[3px] text-blue-500 sm:text-base sm:tracking-[4px]">
              ABOUT ME
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Get To Know<span className="text-blue-500"> Me</span>
            </h2>
          </div>

          {/* Main Content */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* LEFT */}
            <div className="relative flex justify-center">
              <div className="absolute h-[280px] w-[280px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[350px] sm:w-[350px] lg:h-[400px] lg:w-[400px]" />
              <div className="relative rounded-[25px] border border-blue-500/20 bg-slate-900/50 p-4 backdrop-blur-lg sm:rounded-[30px] sm:p-6">
                <img
                  src={AI}
                  alt="About Me"
                  className="w-full max-w-[500px] rounded-2xl sm:rounded-3xl lg:w-[550px]"
                />
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-blue-600 px-4 py-2 shadow-lg shadow-blue-600/30 sm:px-6 sm:py-3">
                  <p className="text-sm font-semibold sm:text-base">
                    MERN & React Native Developer
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm tracking-[2px] text-blue-500 sm:text-base sm:tracking-[3px]">
                WHO AM I?
              </p>
              <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
                Hello, I'm
                <span className="text-blue-500"> Osifo Favour Osarunmwnese</span>
              </h3>
              <h4 className="mb-6 text-lg text-gray-300 sm:mb-8 sm:text-xl">
                Junior MERN & React Native JavaScript Developer
              </h4>

              <p className="mb-6 text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                I am a passionate Junior MERN Stack Developer focused on
                building modern, scalable and user-friendly web applications. I
                enjoy solving problems, learning new technologies, and creating
                digital experiences that make a real impact.
              </p>

              <p className="mb-8 text-sm leading-7 text-gray-400 sm:mb-10 sm:text-base sm:leading-8">
                <span className="font-semibold text-blue-500">
                  SJ Web Solutions (SJWS)
                </span>{" "}
                was founded on the 15th of May, 2026. The brand began when the
                founder designed the first SJWwebs logo. With a vision of
                helping businesses, startups and individuals transform their
                ideas into powerful digital solutions through modern web
                technologies.
              </p>

              {/* Statistics */}
              <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-5">
                {/* Projects */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] sm:p-6">
                  <FaProjectDiagram
                    className="mb-2 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 sm:mb-3"
                    size={24}
                  />
                  <h4 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl">
                    4+
                  </h4>
                  <p className="text-sm text-gray-400 sm:text-base">Projects</p>
                </div>

                {/* MERN */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] sm:p-6">
                  <FaLaptopCode
                    className="mb-2 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 sm:mb-3"
                    size={24}
                  />
                  <h4 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl">
                    MERN
                  </h4>
                  <p className="text-sm text-gray-400 sm:text-base">Stack</p>
                </div>

                {/* Technologies */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] sm:p-6">
                  <FaCode
                    className="mb-2 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 sm:mb-3"
                    size={24}
                  />
                  <h4 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl">
                    15+
                  </h4>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Technologies
                  </p>
                </div>

                {/* Available */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] sm:p-6">
                  <FaRocket
                    className="mb-2 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 sm:mb-3"
                    size={24}
                  />
                  <h4 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl">
                    Available
                  </h4>
                  <p className="text-sm text-gray-400 sm:text-base">For Work</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:justify-start">
                <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500 sm:px-8 sm:py-4 sm:text-base">
                  Download CV
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold transition hover:border-blue-500 sm:px-8 sm:py-4 sm:text-base"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section
        id="skills"
        className="bg-[#020617] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <p className="mb-2 text-sm tracking-[3px] text-blue-500 sm:text-base sm:tracking-[4px]">
              MY SKILLS
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Technologies &<span className="text-blue-500"> Expertise</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:mt-5 sm:text-base">
              Technologies and tools I use to build modern web and mobile
              applications.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((category) => (
              <div
                key={category.title}
                className="group rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-lg transition-all duration-300 hover:-translate-y-3 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl transition group-hover:rotate-12 sm:h-14 sm:w-14 sm:text-2xl">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold sm:text-xl">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs text-gray-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section
        id="projects"
        className="bg-[#020617] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <p className="mb-2 text-sm tracking-[3px] text-blue-500 sm:text-base sm:tracking-[4px]">
              MY WORK
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Featured<span className="text-blue-500"> Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:mt-5 sm:text-base">
              Explore my latest projects built with modern technologies and
              best practices. Each project demonstrates my skills in creating
              scalable, user-friendly applications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 sm:mb-12">
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="relative">
                <FaSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:left-5"
                  size={18}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by project name, technology, or keyword..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/50 py-3 pl-12 pr-12 text-sm text-white placeholder-gray-400 backdrop-blur-lg transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-4 sm:pl-14 sm:pr-14 sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white sm:right-5"
                  >
                    <FaTimes size={18} />
                  </button>
                )}
              </div>

              {searchTerm && (
                <div className="mt-2 text-center text-sm text-gray-400">
                  Press Enter or keep typing to search
                </div>
              )}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:mb-12 sm:gap-6 lg:flex-row">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3 sm:text-base ${
                    activeCategory === category
                      ? "scale-105 border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "border-white/10 bg-slate-900/50 text-gray-300 hover:border-blue-500 hover:text-white"
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
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2 text-sm text-white backdrop-blur-lg transition-all duration-300 hover:border-blue-500 sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
              >
                <FaSort className="text-blue-500" />
                <span className="font-semibold">{sortType}</span>
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    sortDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortDropdownOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl backdrop-blur-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className={`w-full px-6 py-3 text-left text-sm transition-all duration-200 sm:text-base ${
                        sortType === option
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-slate-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <p className="mt-4 text-gray-400">Loading projects...</p>
            </div>
          ) : projectsError ? (
            <div className="py-20 text-center text-red-400">
              {projectsError}
            </div>
          ) : visibleProjects.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-lg transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2">
                        <FaStar className="text-yellow-500" size={12} />
                        <span className="text-xs font-semibold text-yellow-500 sm:text-sm">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      {/* Category & Date */}
                      <div className="mb-3 flex items-center justify-between text-xs sm:mb-4 sm:text-sm">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-400 sm:px-4">
                          {project.category}
                        </span>
                        <span className="text-gray-400">
                          {new Date(project.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400 sm:mb-3 sm:text-2xl">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-sm leading-6 text-gray-400 sm:mb-5 sm:text-base sm:leading-7">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-5 flex flex-wrap gap-2 sm:mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-300 hover:scale-110 sm:px-3 ${getTechnologyColor(
                              tech
                            )}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* ✅ Links — Smart Frontend + Backend Layout */}
                      <div className="space-y-3 sm:space-y-4">
                        {/* Frontend Links */}
                        {(project.githubLink || project.liveLink) && (
                          <div>
                            {(project.backendGithubLink ||
                              project.backendLiveLink) && (
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
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 sm:py-3 sm:text-base"
                                >
                                  <FaGithub size={16} />
                                  <span>Code</span>
                                </a>
                              )}
                              {project.liveLink && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/50 sm:py-3 sm:text-base"
                                >
                                  <FaExternalLinkAlt size={14} />
                                  <span>Live Demo</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Backend Links — only show if they exist */}
                        {(project.backendGithubLink ||
                          project.backendLiveLink) && (
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
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30 sm:py-3 sm:text-base"
                                >
                                  <FaGithub size={16} />
                                  <span>Code</span>
                                </a>
                              )}
                              {project.backendLiveLink && (
                                <a
                                  href={project.backendLiveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/50 sm:py-3 sm:text-base"
                                >
                                  <FaExternalLinkAlt size={14} />
                                  <span>Live API</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center sm:mt-16">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/50 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaRocket className="transition-transform group-hover:translate-y-[-4px]" />
                        <span>Load More Projects</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="py-16 text-center sm:py-20">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-slate-900 sm:h-24 sm:w-24">
                <FaRocket className="text-blue-500" size={32} />
              </div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                No Projects Found
              </h3>
              <p className="mx-auto max-w-md text-sm text-gray-400 sm:text-base">
                No projects match your current search or filter criteria. Try
                adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-xl border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-600 hover:text-white sm:px-8 sm:py-3 sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* CSS for animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* ✅ AUTOMATICALLY renders bottom half — no App.jsx changes needed */}
      <HomePartTwo />

    </>
  );
}