import { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaRegCopy,
  FaCheck,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import {
  HiGlobeAlt,
  HiCog6Tooth,
  HiRocketLaunch,
  HiDevicePhoneMobile,
  HiPaintBrush,
  HiWrenchScrewdriver,
  HiArrowRight,
} from "react-icons/hi2";
import SJ from "../assets/SJ.jpeg";

// ==================== FOOTER DATA ====================

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
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/favourabel",
    hoverColor: "hover:text-white",
    glow: "rgba(255,255,255,0.3)",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
    hoverColor: "hover:text-blue-400",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    name: "Twitter / X",
    icon: FaTwitter,
    href: "#",
    hoverColor: "hover:text-sky-400",
    glow: "rgba(56,189,248,0.4)",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
    hoverColor: "hover:text-pink-400",
    glow: "rgba(236,72,153,0.4)",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "#",
    hoverColor: "hover:text-blue-500",
    glow: "rgba(37,99,235,0.4)",
  },
];

// ==================== FOOTER CONTACT ITEM ====================

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

// ==================== BACK TO TOP BUTTON ====================

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
      <svg
        className="relative h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

// ==================== MAIN FOOTER COMPONENT ====================

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

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
        {/* Top CTA Card */}
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

        {/* Main Footer Grid */}
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

        {/* Social Media Section */}
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

        {/* ==================== BOTTOM BAR — COPYRIGHT ==================== */}
        <div
          className={`flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] py-6 text-center transition-all duration-1000 ease-out md:flex-row md:text-left ${
            footerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-gray-300">
              SJ Web Solutions
            </span>
            . All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Designed & Developed by{" "}
            <a
              href="#home"
              className="font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
            >
              Osifo Favour Osarunmwnese
            </a>
          </p>
        </div>
      </div>

      {/* Back To Top Button */}
      <BackToTop />
    </footer>
  );
}