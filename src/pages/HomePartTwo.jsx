/* ============================================================================
   HomePartTwo.jsx — Bottom half of the homepage
   ============================================================================
   Sections: Services → Contact → BackToTop
   Rendered automatically by HomePartOne — you do NOT import this in App.jsx
   ============================================================================ */

import { useState, useEffect, useRef } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaCheck,
  FaRegCopy,
  FaUser,
  FaTag,
  FaRegCommentDots,
  FaPaperPlane,
  FaTimes,
  FaArrowUp,
} from "react-icons/fa";
import { HiArrowRight, HiCheckCircle, HiMapPin } from "react-icons/hi2";

// ✅ Import shared data from Part One — no third file needed
import { servicesData, contactCards } from "./HomePartOne";

// ✅ Footer component
import Footer from "../component/Footer";

/* ============================================================================
   UI-ONLY HOOK — Scroll reveal entrance animations
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
   SECTION HEADER COMPONENT (UI only)
   ============================================================================ */
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
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
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

/* ============================================================================
   SERVICE CARD COMPONENT
   ============================================================================ */
const ServiceCard = ({ service, index }) => {
  const [ref, isVisible] = useScrollReveal(index * 120);
  const [hovered, setHovered] = useState(false);
  const IconComponent = service.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-7 backdrop-blur-xl transition-all duration-700 ease-out sm:p-8 ${service.borderHover} hover:-translate-y-3 hover:shadow-2xl ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{
        boxShadow: hovered
          ? `0 25px 60px ${service.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition:
          "box-shadow 0.4s ease, transform 0.4s ease, opacity 0.7s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Background glow orbs */}
      <div
        className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-25`}
      />
      <div
        className={`absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-15`}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${service.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          <IconComponent
            className={`${service.iconColor} transition-all duration-500`}
            size={28}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-100 lg:text-2xl">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative mb-5 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-base">
        {service.description}
      </p>

      {/* Divider */}
      <div className="relative mb-5">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Services Label */}
      <p
        className={`relative mb-4 text-xs font-bold uppercase tracking-[3px] sm:text-sm ${service.iconColor}`}
      >
        Services Include
      </p>

      {/* Service Items */}
      <ul className="relative space-y-2.5">
        {service.services.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-base"
          >
            <HiCheckCircle
              className={`mt-0.5 flex-shrink-0 ${service.iconColor}`}
              size={16}
            />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {/* Bottom slide-in accent */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${service.gradient} transition-all duration-700 group-hover:w-full`}
      />
    </div>
  );
};

/* ============================================================================
   CONTACT CARD COMPONENT
   ============================================================================ */
const ContactCard = ({ card, index }) => {
  const [ref, isVisible] = useScrollReveal(index * 150);
  const [hovered, setHovered] = useState(false);

  /* ── Original copy logic — preserved exactly ── */
  const [copied, setCopied] = useState(false);
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
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-5 backdrop-blur-xl transition-all duration-700 ease-out sm:p-6 ${card.borderHover} hover:-translate-y-2 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{
        boxShadow: hovered
          ? `0 20px 50px ${card.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition:
          "box-shadow 0.4s ease, transform 0.4s ease, opacity 0.7s ease",
      }}
    >
      {/* Top accent line */}
      <div
        className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${card.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Glow Orb */}
      <div
        className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${card.gradient} opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-25`}
      />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          <IconComponent className={`${card.iconColor}`} size={20} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-xs font-bold uppercase tracking-[3px] text-gray-500">
            {card.type}
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <p className="truncate text-sm font-bold text-white sm:text-base">
              {card.value}
            </p>
            <button
              onClick={handleCopy}
              aria-label={`Copy ${card.type}`}
              className="flex-shrink-0 rounded-lg p-1 text-gray-600 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <FaCheck className="text-green-400" size={12} />
              ) : (
                <FaRegCopy size={12} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <a
        href={card.href}
        target={card.isExternal ? "_blank" : undefined}
        rel={card.isExternal ? "noopener noreferrer" : undefined}
        className={`mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r ${card.btnGradient} py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:mt-5`}
      >
        <IconComponent size={15} />
        <span>{card.buttonText}</span>
      </a>
    </div>
  );
};

/* ============================================================================
   BACK TO TOP COMPONENT
   ============================================================================ */
const BackToTop = () => {
  /* ── Original scroll progress logic — preserved exactly ── */
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

  /* ── Original circle math — preserved exactly ── */
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/60 ${
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
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2.5"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <FaArrowUp
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
        size={16}
      />
    </button>
  );
};

/* ============================================================================
   SERVICES SECTION
   ============================================================================ */
const ServicesSection = () => {
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#020617] px-6 py-24 text-white lg:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/[0.025] blur-[180px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="What I Offer"
          title="My"
          highlight="Services"
          description="I build scalable, user-focused, and high-performing digital products that help businesses establish a strong online presence, streamline operations, and deliver exceptional user experiences. From responsive websites to full-stack applications and mobile solutions, I create technology that drives results."
        />

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-20 transition-all duration-1000 ease-out lg:mt-24 ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-10 text-center backdrop-blur-xl sm:p-14 md:p-16">
            {/* CTA glows */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-600/8 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="relative">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-4xl shadow-lg">
                🚀
              </div>

              <h3 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h3>

              <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Have a project in mind or need a dedicated developer? I'm
                always excited to collaborate on innovative ideas and bring your
                vision to life with modern technology.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 sm:px-12 sm:py-5 sm:text-lg"
                >
                  <span>Start a Project</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={20}
                  />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                {[
                  "Fast Delivery",
                  "Clean Code",
                  "24/7 Support",
                  "Modern Tech Stack",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <HiCheckCircle className="text-green-500" size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================================
   CONTACT SECTION
   ============================================================================ */
const ContactSection = () => {
  const [formRef, formVisible] = useScrollReveal(200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  /* ── Original form state & logic — preserved exactly ── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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

  /* ── Input base styles ── */
  const inputBase =
    "w-full rounded-2xl border bg-slate-900/60 py-3.5 px-5 text-sm text-white placeholder-gray-600 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-4 sm:text-base";

  const inputBorder = (field) =>
    errors[field]
      ? "border-red-500/50 focus:border-red-500"
      : "border-white/10 focus:border-blue-500";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#020617] px-6 py-24 text-white lg:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something"
          highlight="Great Together"
          description="I'm always open to discussing new opportunities, freelance projects, collaborations, and innovative ideas. Whether you're a recruiter looking for talent, a business seeking digital solutions, or a client with a project in mind, I'd love to hear from you."
        />

        {/* Split Layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── LEFT — Contact Info ── */}
          <div>
            <h3 className="text-2xl font-extrabold sm:text-3xl">
              Contact{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Information
              </span>
            </h3>
            <p className="mt-3 text-base leading-8 text-gray-400">
              Reach out through any of these channels. I typically respond
              within 24 hours. Let's turn your ideas into reality.
            </p>

            {/* Availability Badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-900/60 px-5 py-3 backdrop-blur-lg">
              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <HiMapPin className="text-blue-400" size={16} />
              <span className="text-sm font-medium text-gray-300">
                Available for Remote Work Worldwide
              </span>
            </div>

            {/* Contact Cards */}
            <div className="mt-7 space-y-4">
              {contactCards.map((card, index) => (
                <ContactCard key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-gray-500">
                Connect With Me
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                  {
                    icon: FaEnvelope,
                    href: "mailto:favourabel150@gmail.com",
                  },
                  {
                    icon: FaWhatsapp,
                    href: "https://wa.me/2349130593550",
                    external: true,
                  },
                ].map(({ icon: Icon, href, external }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-slate-900/60 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Contact Form ── */}
          <div
            ref={formRef}
            className={`transition-all duration-1000 ease-out ${
              formVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-7 backdrop-blur-xl sm:p-9 md:p-10">
              {/* Decorative lines */}
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

              {/* Glow orbs */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-600/10 blur-[90px]" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-600/8 blur-[90px]" />

              <div className="relative">
                <h3 className="mb-1.5 text-2xl font-extrabold">
                  Send Me a Message
                </h3>
                <p className="mb-7 text-sm text-gray-500">
                  Fill out the form below and I'll get back to you shortly.
                </p>

                {/* ── FORM (original logic — zero changes) ── */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-gray-300"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"
                        size={13}
                      />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`${inputBase} ${inputBorder("name")} pl-12`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                        <FaTimes size={10} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-gray-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"
                        size={13}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${inputBase} ${inputBorder("email")} pl-12`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                        <FaTimes size={10} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-bold text-gray-300"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <FaTag
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"
                        size={13}
                      />
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity"
                        className={`${inputBase} ${inputBorder("subject")} pl-12`}
                      />
                    </div>
                    {errors.subject && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                        <FaTimes size={10} />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-bold text-gray-300"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <FaRegCommentDots
                        className="absolute left-5 top-4 text-gray-600 sm:top-5"
                        size={13}
                      />
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        className={`${inputBase} ${inputBorder("message")} resize-none pl-12 pt-3.5 sm:pt-4`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                        <FaTimes size={10} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Success / Error Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-green-500/25 bg-green-500/8 px-5 py-4 text-sm text-green-400">
                      <FaCheck size={14} className="flex-shrink-0" />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-500/25 bg-red-500/8 px-5 py-4 text-sm text-red-400">
                      <FaTimes size={14} className="flex-shrink-0" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-60"
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
                          size={15}
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
          className={`mt-20 transition-all duration-1000 ease-out lg:mt-24 ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-10 text-center backdrop-blur-xl sm:p-14 md:p-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-600/8 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="relative">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-4xl shadow-lg">
                💡
              </div>

              <h3 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Ready to Bring Your Ideas to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Life?
                </span>
              </h3>

              <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Let's collaborate to build modern, scalable, and impactful
                digital experiences that deliver real results.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <a
                  href="https://wa.me/2349130593550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 sm:px-12 sm:py-5 sm:text-lg"
                >
                  <span>Let's Talk</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={20}
                  />
                </a>
                <a
                  href="mailto:favourabel150@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-10 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.08] sm:px-12 sm:py-5 sm:text-lg"
                >
                  <span>Hire Me</span>
                  <FaEnvelope
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={15}
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


/* ============================================================================
   MAIN EXPORT
   ============================================================================ */
export default function HomePartTwo() {
  return (
    <>
      <ServicesSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </>
  );
}