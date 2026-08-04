// ==================== IMPORTS ====================
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Assets
import SJ from "../assets/SJ.jpeg";
import AI from "../assets/AI.jpg";


// Icons - Organized by category
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
  FaRegCopy,
  FaCheck,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaRegCommentDots,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaFileDownload,
  FaArrowUp,
  FaHeart,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiReact,
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiTailwindcss,
  SiSupabase,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiExpo,
  SiRedux,
  SiMysql,
  SiTypescript,
} from "react-icons/si";

import { HiMenu, HiX } from "react-icons/hi";

import {
  HiGlobeAlt,
  HiCog6Tooth,
  HiRocketLaunch,
  HiDevicePhoneMobile,
  HiPaintBrush,
  HiWrenchScrewdriver,
  HiCheckCircle,
  HiArrowRight,
  HiMapPin,
} from "react-icons/hi2";

// ==================== DATA CONFIGURATION ====================

/**
 * Projects Data
 * Easy to add, remove, or modify projects
 */
const projectsData = [
  {
    id: 1,
    title: "Unicode - Modern Portfolio",
    description: "A stunning, responsive portfolio website showcasing projects and skills with modern UI/UX design and smooth animations.",
    category: "Frontend",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    githubLink: "https://github.com/favourabel/my-Unicode",
    liveLink: "https://my-unicode.vercel.app",
    featured: true,
    keywords: ["portfolio", "responsive", "animation", "modern design"],
  },
  {
    id: 2,
    title: "My Travels",
    description: "An interactive travel diary application to document and share your travel experiences around the world with beautiful UI.",
    category: "Full Stack",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubLink: "https://github.com/favourabel/my-travels",
    liveLink: "https://my-travels-chi.vercel.app",
    featured: true,
    keywords: ["travel", "blog", "diary", "CRUD", "authentication"],
  },
  {
    id: 3,
    title: "Dominion Platform",
    description: "A comprehensive platform for managing church activities, events, and member engagement with role-based access control.",
    category: "Full Stack",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubLink: "https://github.com/favourabel/my-dominion",
    liveLink: "https://my-dominion-azf7.vercel.app",
    featured: false,
    keywords: ["church", "management", "events", "members", "dashboard"],
  },
  {
    id: 4,
    title: "Magnific Editing Studio",
    description: "Built a modern photo and video editing studio using React, Node.js, and Tailwind CSS, featuring an intuitive UI, responsive design, and advanced media editing functionality",
    category: "Full Stack",
    date: "2026-05-20",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind CSS"],
    githubLink: "https://github.com/favourabel/my-magnific",
    liveLink: "https://my-magnific.vercel.app",
    featured: true,
    keywords: ["editing", "studio", "video", "photo", "design"],
  },
];

/**
 * Services Data
 * Configure all service offerings
 */
const servicesData = [
  {
    id: 1,
    title: "Frontend Development",
    icon: HiGlobeAlt,
    description: "Create modern, responsive, and visually appealing user interfaces that provide seamless experiences across all devices.",
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
    description: "Build secure, scalable, and efficient server-side systems designed to support modern applications and business operations.",
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
    description: "Develop complete web applications from frontend to backend with a focus on scalability, performance, and maintainability.",
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
    description: "Build modern mobile applications that deliver smooth performance and exceptional user experiences.",
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
    description: "Transform ideas and designs into beautiful, responsive, and accessible digital experiences.",
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
    description: "Ensure applications remain secure, updated, fast, and reliable through continuous support and optimization.",
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

/**
 * Contact Data
 * Configure all contact methods
 */
const contactCards = [
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

/**
 * Footer Data
 * Navigation, services, and social links
 */
const footerNavLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const footerServices = [
  { name: "Frontend Development", icon: HiGlobeAlt },
  { name: "Backend Development", icon: HiCog6Tooth },
  { name: "Full-Stack Development", icon: HiRocketLaunch },
  { name: "Mobile Development", icon: HiDevicePhoneMobile },
  { name: "UI Implementation", icon: HiPaintBrush },
  { name: "Website Maintenance", icon: HiWrenchScrewdriver },
];

const footerContacts = [
  {
    id: "email",
    label: "Email",
    value: "favourabel150@gmail.com",
    rawValue: "favourabel150@gmail.com",
    href: "mailto:favourabel150@gmail.com",
    icon: FaEnvelope,
    iconColor: "text-purple-400",
    external: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+2349130593550",
    rawValue: "+2349130593550",
    href: "https://wa.me/2349130593550",
    icon: FaWhatsapp,
    iconColor: "text-green-400",
    external: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+2349156480871",
    rawValue: "+2349156480871",
    href: "tel:+2349156480871",
    icon: FaPhoneAlt,
    iconColor: "text-blue-400",
    external: false,
  },
];

const footerSocials = [
  { name: "GitHub", icon: FaGithub, href: "#", hoverColor: "hover:text-white", glow: "rgba(255,255,255,0.3)" },
  { name: "LinkedIn", icon: FaLinkedin, href: "#", hoverColor: "hover:text-blue-400", glow: "rgba(59,130,246,0.4)" },
  { name: "Twitter / X", icon: FaTwitter, href: "#", hoverColor: "hover:text-sky-400", glow: "rgba(56,189,248,0.4)" },
  { name: "Instagram", icon: FaInstagram, href: "#", hoverColor: "hover:text-pink-400", glow: "rgba(236,72,153,0.4)" },
  { name: "Facebook", icon: FaFacebookF, href: "#", hoverColor: "hover:text-blue-500", glow: "rgba(37,99,235,0.4)" },
  { name: "Download Resume", icon: FaFileDownload, href: "#", hoverColor: "hover:text-emerald-400", glow: "rgba(16,185,129,0.4)" },
];

/**
 * Skills Data
 * Technology stack organized by category
 */
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
    skills: ["Vercel", "Netlify", "Render","Cloudinary"],
  },
];

// ==================== UTILITY FUNCTIONS ====================

/**
 * Filter projects by category
 */
const filterProjects = (projects, category) => {
  if (category === "All") return projects;
  if (category === "Featured") return projects.filter((p) => p.featured);
  return projects.filter((p) => p.category === category);
};

/**
 * Sort projects by date
 */
const sortProjects = (projects, sortType) => {
  const sorted = [...projects];
  if (sortType === "Newest First") {
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Search projects by term
 */
const searchProjects = (projects, searchTerm) => {
  if (!searchTerm.trim()) return projects;

  const term = searchTerm.toLowerCase();

  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(term)) ||
      project.keywords.some((keyword) => keyword.toLowerCase().includes(term))
  );
};

/**
 * Get Tailwind classes for technology badges
 */
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

// ==================== REUSABLE COMPONENTS ====================

/**
 * Service Card Component
 * Displays individual service with animation
 */
const ServiceCard = ({ service, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const IconComponent = service.icon;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-8 backdrop-blur-xl transition-all duration-700 ease-out ${service.borderHover} hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{
        boxShadow: isVisible
          ? "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
          : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 60px ${service.glowColor}, 0 0 80px ${service.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)";
      }}
    >
      {/* Background Gradient Orb */}
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-30`}
      />
      <div
        className={`absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-20`}
      />

      {/* Top Gradient Line */}
      <div
        className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${service.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
          style={{
            boxShadow: `0 0 0 rgba(0,0,0,0)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 30px ${service.glowColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
          }}
        >
          <IconComponent
            className={`${service.iconColor} transition-all duration-500 group-hover:scale-110`}
            size={32}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative mb-4 text-xl font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 lg:text-2xl">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative mb-6 leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
        {service.description}
      </p>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Services Label */}
      <p
        className={`relative mb-4 text-sm font-semibold uppercase tracking-[3px] ${service.iconColor}`}
      >
        Services Include
      </p>

      {/* Service Items */}
      <ul className="relative space-y-3">
        {service.services.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-gray-400 transition-all duration-300 group-hover:text-gray-300"
          >
            <HiCheckCircle
              className={`mt-0.5 flex-shrink-0 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}
              size={18}
            />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Gradient Line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${service.gradient} transition-all duration-700 group-hover:w-full`}
      />
    </div>
  );
};

/**
 * Contact Card Component
 * Displays contact method with copy functionality
 */
const ContactCard = ({ card, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.rawValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const IconComponent = card.icon;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-700 ease-out ${
        card.borderHover
      } hover:-translate-y-2 hover:scale-[1.02] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        boxShadow:
          "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 50px ${card.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)";
      }}
    >
      {/* Glow Orb */}
      <div
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-30`}
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          <IconComponent className={`${card.iconColor}`} size={24} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            {card.type}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="truncate text-base font-semibold text-white">
              {card.value}
            </p>
            <button
              onClick={handleCopy}
              aria-label={`Copy ${card.type}`}
              className="flex-shrink-0 text-gray-500 transition-colors duration-300 hover:text-white"
            >
              {copied ? (
                <FaCheck className="text-green-400" size={14} />
              ) : (
                <FaRegCopy size={14} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Button */}
      <a
        href={card.href}
        target={card.isExternal ? "_blank" : undefined}
        rel={card.isExternal ? "noopener noreferrer" : undefined}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${card.btnGradient} py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
      >
        <IconComponent size={16} />
        <span>{card.buttonText}</span>
      </a>
    </div>
  );
};

/**
 * Footer Contact Item Component
 */
const FooterContactItem = ({ contact }) => {
  const [copied, setCopied] = useState(false);
  const Icon = contact.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.rawValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <li className="group flex items-center gap-3">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-slate-800/50 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40">
        <Icon className={contact.iconColor} size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {contact.label}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={contact.href}
            target={contact.external ? "_blank" : undefined}
            rel={contact.external ? "noopener noreferrer" : undefined}
            className="truncate text-sm text-gray-300 transition-colors duration-300 hover:text-blue-400"
          >
            {contact.value}
          </a>
          <button
            onClick={handleCopy}
            aria-label={`Copy ${contact.label}`}
            className="flex-shrink-0 text-gray-600 transition-colors duration-300 hover:text-white"
          >
            {copied ? (
              <FaCheck className="text-green-400" size={12} />
            ) : (
              <FaRegCopy size={12} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

/**
 * Back to Top Button Component
 * With scroll progress indicator
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Circle progress math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/60 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="56"
        height="56"
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <FaArrowUp
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
        size={18}
      />
    </button>
  );
};

// ==================== MAJOR SECTION COMPONENTS ====================

/**
 * Services Section Component
 */
const ServicesSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      headerObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white"
    >
      {/* Background Elements */}
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="absolute right-[5%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
        <div className="absolute left-[50%] top-[50%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/[0.03] blur-[180px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-20 text-center transition-all duration-1000 ease-out ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/5 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-sm font-medium uppercase tracking-[4px] text-blue-400">
              What I Offer
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          {/* Subtitle */}
          <h3 className="mx-auto mt-6 max-w-2xl text-xl font-medium text-gray-300 md:text-2xl">
            Transforming Ideas Into Modern Digital Solutions
          </h3>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
            I build scalable, user-focused, and high-performing digital products
            that help businesses establish a strong online presence, streamline
            operations, and deliver exceptional user experiences. From
            responsive websites to full-stack applications and mobile solutions,
            I create technology that drives results.
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-24 transition-all duration-1000 ease-out ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-12 text-center backdrop-blur-xl md:p-16">
            {/* CTA Background Effects */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {/* CTA Content */}
            <div className="relative">
              {/* Emoji */}
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-4xl">
                🚀
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h3>

              <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-400">
                Have a project in mind or need a dedicated developer? I'm
                always excited to collaborate on innovative ideas and bring your
                vision to life with modern technology.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40"
                >
                  <span>Start a Project</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={22}
                  />
                </a>

                
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={18} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={18} />
                  <span>Clean Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={18} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={18} />
                  <span>Modern Tech Stack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Contact Section Component
 */
const ContactSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const headerRef = useRef(null);
  const formRef = useRef(null);
  const ctaRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const makeObserver = (setter) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
        },
        { threshold: 0.1 }
      );

    const headerObs = makeObserver(setHeaderVisible);
    const formObs = makeObserver(setFormVisible);
    const ctaObs = makeObserver(setCtaVisible);

    if (headerRef.current) headerObs.observe(headerRef.current);
    if (formRef.current) formObs.observe(formRef.current);
    if (ctaRef.current) ctaObs.observe(ctaRef.current);

    return () => {
      headerObs.disconnect();
      formObs.disconnect();
      ctaObs.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate sending (replace with your API/email service later)
    setTimeout(() => {
      try {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    }, 1800);
  };

  const inputBase =
    "w-full rounded-2xl border bg-slate-900/50 py-4 px-5 text-white placeholder-gray-500 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#020617] px-6 py-28 text-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-20 text-center transition-all duration-1000 ease-out ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/5 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-sm font-medium uppercase tracking-[4px] text-blue-400">
              Get In Touch
            </span>
          </div>

          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Great Together
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
            I'm always open to discussing new opportunities, freelance
            projects, collaborations, and innovative ideas. Whether you're a
            recruiter looking for talent, a business seeking digital solutions,
            or a client with a project in mind, I'd love to hear from you.
          </p>

          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT SIDE — Info */}
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              Contact <span className="text-blue-500">Information</span>
            </h3>
            <p className="mt-4 leading-8 text-gray-400">
              Reach out through any of these channels. I typically respond
              within 24 hours. Let's turn your ideas into reality.
            </p>

            {/* Location strip */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-900/50 px-5 py-3 backdrop-blur-lg">
              <HiMapPin className="text-blue-400" size={20} />
              <span className="text-gray-300">
                Available for Remote Work Worldwide
              </span>
            </div>

            {/* Contact Cards */}
            <div className="mt-8 space-y-5">
              {contactCards.map((card, index) => (
                <ContactCard key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Socials */}
            <div className="mt-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-400">
                Connect with me
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="mailto:favourabel150@gmail.com"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white"
                >
                  <FaEnvelope size={20} />
                </a>
                <a
                  href="https://wa.me/2349130593550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Form */}
          <div
            ref={formRef}
            className={`transition-all duration-1000 ease-out ${
              formVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl md:p-10">
              {/* Top Glow Line */}
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              {/* Glow Orbs */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-600/10 blur-[80px]" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-600/10 blur-[80px]" />

              <div className="relative">
                <h3 className="mb-2 text-2xl font-bold">Send Me a Message</h3>
                <p className="mb-8 text-gray-400">
                  Fill out the form below and I'll get back to you shortly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`${inputBase} pl-12 ${
                          errors.name
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${inputBase} pl-12 ${
                          errors.email
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <FaTag
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity"
                        className={`${inputBase} pl-12 ${
                          errors.subject
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.subject && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <FaRegCommentDots
                        className="absolute left-5 top-5 text-gray-500"
                        size={16}
                      />
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        className={`${inputBase} resize-none pl-12 pt-4 ${
                          errors.message
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Success / Error Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-400">
                      <FaCheck size={18} />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
                      <FaTimes size={18} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          size={18}
                        />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-24 transition-all duration-1000 ease-out ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-12 text-center backdrop-blur-xl md:p-16">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-4xl">
                💡
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Ready to Bring Your Ideas to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Life?
                </span>
              </h3>

              <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-400">
                Let's collaborate to build modern, scalable, and impactful
                digital experiences that deliver real results.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href="https://wa.me/2349130593550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40"
                >
                  <span>Let's Talk</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={22}
                  />
                </a>

                <a
                  href="mailto:favourabel150@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/[0.06]"
                >
                  <span>Hire Me</span>
                  <FaEnvelope
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

  // Easily changeable availability status
  const availabilityStatus = "Available for Remote Work & Freelance Projects";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFooterVisible(true);
      },
      { threshold: 0.05 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#020617] px-6 pt-16 text-white"
    >
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 -top-20 h-[400px] w-[400px] rounded-full bg-blue-600/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-600/[0.05] blur-[140px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ===== Top CTA Card ===== */}
        <div
          className={`mb-16 transition-all duration-1000 ease-out ${
            footerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-10 backdrop-blur-xl md:p-14">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-600/10 blur-[90px]" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-purple-600/10 blur-[90px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div>
                <h3 className="text-3xl font-bold md:text-4xl">
                  Let's Build Something{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Amazing Together
                  </span>
                </h3>
                <p className="mt-4 max-w-xl text-gray-400">
                  Looking for a developer to bring your ideas to life? Let's
                  discuss your next project.
                </p>
              </div>

              <a
                href="#contact"
                className="group inline-flex flex-shrink-0 items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-9 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/50"
              >
                <span>Let's Talk</span>
                <HiArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={22}
                />
              </a>
            </div>
          </div>
        </div>

        {/* ===== Main Footer Grid ===== */}
        <div
          className={`grid gap-12 pb-12 transition-all duration-1000 ease-out sm:grid-cols-2 lg:grid-cols-4 ${
            footerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10">
                <img
                  src={SJ}
                  alt="SJWS Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold">SJ Web Solutions</h4>
                <p className="text-xs tracking-wider text-blue-400">SJWS</p>
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-400">
              Building modern, scalable, and user-focused digital solutions
              that help businesses, startups, and individuals establish a
              strong online presence and achieve their goals through innovative
              technology.
            </p>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-400">
                {availabilityStatus}
              </span>
            </div>
          </div>

          {/* Column 2 — Quick Navigation */}
          <div>
            <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-blue-400"
                  >
                    <span className="absolute -left-4 opacity-0 transition-all duration-300 group-hover:left-0 group-hover:opacity-100">
                      <HiArrowRight size={12} className="text-blue-400" />
                    </span>
                    <span className="transition-all duration-300 group-hover:translate-x-4">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {footerServices.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <a
                      href="#services"
                      className="group flex items-center gap-2.5 text-sm text-gray-400 transition-colors duration-300 hover:text-blue-400"
                    >
                      <Icon
                        size={15}
                        className="text-gray-600 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-400"
                      />
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {service.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="mb-6 text-base font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {footerContacts.map((contact) => (
                <FooterContactItem key={contact.id} contact={contact} />
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Social Media Section ===== */}
        <div
          className={`flex flex-col items-center justify-between gap-6 border-t border-white/[0.08] py-8 transition-all duration-1000 ease-out md:flex-row ${
            footerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-sm text-gray-400">
            Follow me & connect on social platforms
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {footerSocials.map((social) => {
              const Icon = social.icon;
              return (
                <div key={social.name} className="group relative">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-slate-900/50 text-gray-400 transition-all duration-300 hover:scale-110 hover:border-blue-500/50 ${social.hoverColor}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${social.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs text-white opacity-0 transition-all duration-300 group-hover:-top-12 group-hover:opacity-100">
                    {social.name}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 text-center md:flex-row md:text-left">
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-300">
              SJ Web Solutions
            </span>
            . All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            Designed & Built with
            <FaHeart className="animate-pulse text-red-500" size={13} />
            by{" "}
            <span className="font-semibold text-blue-400">
              Osifo Favour Osarunmwnese
            </span>
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-blue-400"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-blue-400"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Back To Top Floating Button (with scroll progress) */}
      <BackToTop />
    </footer>
  );
};

// ==================== MAIN HERO COMPONENT ====================

export default function Hero() {


  const navigate = useNavigate();

  // ==================== STATE MANAGEMENT ====================
  const [open, setOpen] = useState(false);

  // Projects State
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortType, setSortType] = useState("Newest First");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Navigation Links (matches section IDs exactly - case-sensitive)
  const links = [
    "home",
    "about",
    "skills",
    "projects",
    "services",
    "contact",
  ];

  // ==================== SMOOTH SCROLL FUNCTION ====================
  /**
   * Smooth scroll to any section by ID
   * @param {string} sectionId - The ID of the section to scroll to
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==================== EFFECTS ====================

  /**
   * Update displayed projects based on filters
   */
  useEffect(() => {
    let filtered = filterProjects(projectsData, activeCategory);
    filtered = searchProjects(filtered, searchTerm);
    filtered = sortProjects(filtered, sortType);
    setDisplayedProjects(filtered);
    setVisibleCount(6);
  }, [activeCategory, sortType, searchTerm]);

  // ==================== HANDLERS ====================

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

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

  // ==================== COMPUTED VALUES ====================
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

  // ==================== RENDER ====================
  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-[#020617] text-white"
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

       
        {/* ===== HERO CONTENT ===== */}
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-16 px-6 pt-32 lg:flex-row">
          {/* LEFT SIDE */}
          <div className="z-10 flex-1">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-500/5 px-6 py-3">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="tracking-[4px] text-blue-400">
                MERN & React Native DEVELOPER
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              Osifo Favour
              <br />
              <span className="text-blue-500">Osarunmwnese</span>
            </h1>

            <h2 className="mt-6 text-2xl text-gray-300">
              Junior Full-Stack & Mobile Developer<br/>
              MERN Stack + React Native.</h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
             I build modern, responsive, and scalable web and mobile applications using
             the MERN stack and React Native. Through SJ Web Solutions, I turn ideas into 
             seamless digital experiences powered by clean code, creative problem-
             solving, and modern technology.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <button
                onClick={() => scrollToSection("projects")}
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:-translate-y-1 hover:bg-blue-500"
              >
                View My Work
              </button>
             <button onClick={() => navigate("/resume")}
             className="rounded-xl border border-gray-700 px-8 py-4 font-semibold transition hover:border-blue-500">
            Download Resume
           </button>
            </div>

            {/* Socials */}
            <div className="mt-12 flex gap-5">
              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 transition hover:bg-blue-600"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="relative rounded-[40px] border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-lg">
              <img
                src={AI}
                alt="Osifo Favour"
                className="w-[420px] rounded-3xl object-cover shadow-2xl"
              />

              {/* React */}
              <div className="absolute -left-12 top-10 animate-bounce rounded-2xl border border-white/10 bg-slate-900 p-5">
                <SiReact size={40} className="text-cyan-400" />
                <p className="mt-2">React</p>
              </div>

              {/* Node */}
              <div className="absolute -right-14 top-32 animate-pulse rounded-2xl border border-white/10 bg-slate-900 p-5">
                <SiNodedotjs size={40} className="text-green-500" />
                <p className="mt-2">Node.js</p>
              </div>

              {/* Express */}
              <div className="absolute -left-14 bottom-32 animate-bounce rounded-2xl border border-white/10 bg-slate-900 p-5">
                <SiExpress size={40} />
                <p className="mt-2">Express</p>
              </div>

              {/* Mongo */}
              <div className="absolute -right-10 bottom-10 animate-pulse rounded-2xl border border-white/10 bg-slate-900 p-5">
                <SiMongodb size={40} className="text-green-600" />
                <p className="mt-2">MongoDB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="animate-bounce text-sm tracking-[5px] text-gray-400">
            SCROLL DOWN
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="bg-[#020617] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mb-20 text-center">
            <p className="mb-2 tracking-[4px] text-blue-500">ABOUT ME</p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Get To Know<span className="text-blue-500"> Me</span>
            </h2>
          </div>

          {/* Main Content */}
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="relative flex justify-center">
              {/* Glow */}
              <div className="absolute h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />

              {/* Card */}
              <div className="relative rounded-[30px] border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-lg">
                <img src={AI} alt="About Me" className="w-[550px] rounded-3xl" />

                {/* Floating Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-blue-600 px-6 py-3 shadow-lg shadow-blue-600/30">
                  <p className="font-semibold"> MERN & React Native Developer</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <p className="mb-3 tracking-[3px] text-blue-500">WHO AM I?</p>

              <h3 className="mb-6 text-4xl font-bold">
                Hello, I'm
                <span className="text-blue-500">
                  {" "}
                  Osifo Favour Osarunmwnese
                </span>
              </h3>

              <h4 className="mb-8 text-xl text-gray-300">
                Junior MERN & React Native  JavaScript Developer
              </h4>

              <p className="mb-6 leading-8 text-gray-400">
                I am a passionate Junior MERN Stack Developer focused on
                building modern, scalable and user-friendly web applications. I
                enjoy solving problems, learning new technologies, and creating
                digital experiences that make a real impact.
              </p>

              <p className="mb-10 leading-8 text-gray-400">
                <span className="font-semibold text-blue-500">
                  SJ Web Solutions (SJWS)
                </span>{" "}
                was founded on the 15th of May, 2026.The brand began when the founder
                designed the first SJWwebs logo.With a vision of helping
                businesses, startups and individuals transform their ideas into
                powerful digital solutions through modern web technologies.
              </p>

              {/* Statistics */}
              <div className="mb-10 grid grid-cols-2 gap-5">
                {/* Projects */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]">
                  <FaProjectDiagram
                    className="mb-3 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                    size={28}
                  />
                  <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                    4+
                  </h4>
                  <p className="text-gray-400">Projects</p>
                </div>

                {/* MERN */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]">
                  <FaLaptopCode
                    className="mb-3 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                    size={28}
                  />
                  <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                    MERN
                  </h4>
                  <p className="text-gray-400">Stack</p>
                </div>

                {/* Technologies */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]">
                  <FaCode
                    className="mb-3 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                    size={28}
                  />
                  <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                    15+
                  </h4>
                  <p className="text-gray-400">Technologies</p>
                </div>

                {/* Available */}
                <div className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]">
                  <FaRocket
                    className="mb-3 text-blue-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                    size={28}
                  />
                  <h4 className="text-2xl font-bold transition-colors duration-300 group-hover:text-blue-400">
                    Available
                  </h4>
                  <p className="text-gray-400">For Work</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-5">
                <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500">
                  Download CV
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="rounded-xl border border-gray-700 px-8 py-4 font-semibold transition hover:border-blue-500"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="bg-[#020617] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-20 text-center">
            <p className="mb-2 tracking-[4px] text-blue-500">MY SKILLS</p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Technologies &<span className="text-blue-500"> Expertise</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Technologies and tools I use to build modern web and mobile
              applications.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((category) => (
              <div
                key={category.title}
                className="group rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-lg transition-all duration-300 hover:-translate-y-3 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                {/* Header */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl transition group-hover:rotate-12">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm text-gray-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
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
      <section id="projects" className="bg-[#020617] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mb-20 text-center">
            <p className="mb-2 tracking-[4px] text-blue-500">MY WORK</p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Featured<span className="text-blue-500"> Projects</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Explore my latest projects built with modern technologies and
              best practices. Each project demonstrates my skills in creating
              scalable, user-friendly applications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="relative">
                <FaSearch
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by project name, technology, or keyword..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/50 py-4 pl-14 pr-14 text-white placeholder-gray-400 backdrop-blur-lg transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />

                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
                  >
                    <FaTimes size={20} />
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
          <div className="mb-12 flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl border px-6 py-3 font-semibold transition-all duration-300 ${
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
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-6 py-3 text-white backdrop-blur-lg transition-all duration-300 hover:border-blue-500"
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
                      className={`w-full px-6 py-3 text-left transition-all duration-200 ${
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
          {visibleProjects.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-lg transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${
                        index * 0.1
                      }s both`,
                    }}
                  >
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 backdrop-blur-md">
                        <FaStar className="text-yellow-500" size={14} />
                        <span className="text-sm font-semibold text-yellow-500">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="mb-4 flex items-center justify-between text-sm">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-blue-400">
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
                      <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-5 leading-7 text-gray-400">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`rounded-lg border px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-110 ${getTechnologyColor(
                              tech
                            )}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800 py-3 font-semibold text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30"
                        >
                          <FaGithub size={18} />
                          <span>Code</span>
                        </a>

                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/50"
                        >
                          <FaExternalLinkAlt size={16} />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            // Empty State
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-slate-900">
                <FaRocket className="text-blue-500" size={40} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">No Projects Found</h3>

              <p className="mx-auto max-w-md text-gray-400">
                No projects match your current search or filter criteria. Try
                adjusting your filters or search term.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-xl border border-blue-500 px-8 py-3 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-600 hover:text-white"
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

      {/* ==================== SERVICES SECTION ==================== */}
      <ServicesSection />

      {/* ==================== CONTACT SECTION ==================== */}
      <ContactSection />

      {/* ==================== FOOTER SECTION ==================== */}
      <Footer />
    </div>
  );
}