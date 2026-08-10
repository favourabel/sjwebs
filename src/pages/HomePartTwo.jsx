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

/* ============================================================================
   SERVICE CARD COMPONENT
   ============================================================================ */
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
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-700 ease-out sm:p-8 ${service.borderHover} hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl ${
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
      <div className="relative mb-5 sm:mb-6">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-16 sm:w-16`}
        >
          <IconComponent
            className={`${service.iconColor} transition-all duration-500 group-hover:scale-110`}
            size={28}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative mb-3 text-lg font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 sm:mb-4 sm:text-xl lg:text-2xl">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative mb-5 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:mb-6 sm:text-base">
        {service.description}
      </p>

      {/* Divider */}
      <div className="relative mb-5 sm:mb-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Services Label */}
      <p
        className={`relative mb-3 text-xs font-semibold uppercase tracking-[3px] sm:mb-4 sm:text-sm ${service.iconColor}`}
      >
        Services Include
      </p>

      {/* Service Items */}
      <ul className="relative space-y-2 sm:space-y-3">
        {service.services.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-400 transition-all duration-300 group-hover:text-gray-300 sm:gap-3 sm:text-base"
          >
            <HiCheckCircle
              className={`mt-0.5 flex-shrink-0 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`}
              size={16}
            />
            <span className="leading-relaxed">{item}</span>
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

/* ============================================================================
   CONTACT CARD COMPONENT
   ============================================================================ */
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
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 p-5 backdrop-blur-xl transition-all duration-700 ease-out sm:p-6 ${
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

      <div className="relative flex items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} border border-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-14 sm:w-14`}
        >
          <IconComponent className={`${card.iconColor}`} size={20} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 sm:text-sm">
            {card.type}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-white sm:text-base">
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
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${card.btnGradient} py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:mt-5 sm:py-3 sm:text-base`}
      >
        <IconComponent size={16} />
        <span>{card.buttonText}</span>
      </a>
    </div>
  );
};

/* ============================================================================
   BACK TO TOP COMPONENT
   ============================================================================ */
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
      className={`group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/60 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${
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
        size={16}
      />
    </button>
  );
};

/* ============================================================================
   SERVICES SECTION
   ============================================================================ */
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
      className="relative overflow-hidden bg-[#020617] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Background Elements */}
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="absolute right-[5%] top-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[150px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[250px] w-[250px] rounded-full bg-purple-600/[0.04] blur-[150px] sm:h-[400px] sm:w-[400px]" />
        <div className="absolute left-[50%] top-[50%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/[0.03] blur-[180px] sm:h-[600px] sm:w-[600px]" />
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
          className={`mb-14 text-center transition-all duration-1000 ease-out sm:mb-16 lg:mb-20 ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 backdrop-blur-sm sm:mb-6 sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-xs font-medium uppercase tracking-[3px] text-blue-400 sm:text-sm sm:tracking-[4px]">
              What I Offer
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          {/* Subtitle */}
          <h3 className="mx-auto mt-4 max-w-2xl text-lg font-medium text-gray-300 sm:mt-6 sm:text-xl md:text-2xl">
            Transforming Ideas Into Modern Digital Solutions
          </h3>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            I build scalable, user-focused, and high-performing digital products
            that help businesses establish a strong online presence, streamline
            operations, and deliver exceptional user experiences. From
            responsive websites to full-stack applications and mobile solutions,
            I create technology that drives results.
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3 sm:mt-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50 sm:w-16" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50 sm:w-16" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-16 transition-all duration-1000 ease-out sm:mt-20 lg:mt-24 ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 text-center backdrop-blur-xl sm:p-12 md:p-16">
            {/* CTA Background Effects */}
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {/* CTA Content */}
            <div className="relative">
              {/* Emoji */}
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-3xl sm:mb-6 sm:h-20 sm:w-20 sm:text-4xl">
                🚀
              </div>

              <h3 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-gray-400 sm:mb-10 sm:text-base sm:leading-8 md:text-lg">
                Have a project in mind or need a dedicated developer? I'm
                always excited to collaborate on innovative ideas and bring your
                vision to life with modern technology.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 sm:gap-3 sm:px-10 sm:py-5 sm:text-lg"
                >
                  <span>Start a Project</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={20}
                  />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 sm:mt-12 sm:gap-8 sm:text-sm">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={16} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={16} />
                  <span>Clean Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={16} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" size={16} />
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

/* ============================================================================
   CONTACT SECTION
   ============================================================================ */
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
    "w-full rounded-2xl border bg-slate-900/50 py-3 px-4 text-sm text-white placeholder-gray-500 backdrop-blur-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-4 sm:px-5 sm:text-base";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#020617] px-4 py-20 text-white sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute right-[5%] top-[10%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[150px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[250px] w-[250px] rounded-full bg-purple-600/[0.04] blur-[150px] sm:h-[400px] sm:w-[400px]" />
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
          className={`mb-14 text-center transition-all duration-1000 ease-out sm:mb-16 lg:mb-20 ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 backdrop-blur-sm sm:mb-6 sm:gap-3 sm:px-6 sm:py-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-xs font-medium uppercase tracking-[3px] text-blue-400 sm:text-sm sm:tracking-[4px]">
              Get In Touch
            </span>
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Great Together
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            I'm always open to discussing new opportunities, freelance
            projects, collaborations, and innovative ideas. Whether you're a
            recruiter looking for talent, a business seeking digital solutions,
            or a client with a project in mind, I'd love to hear from you.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3 sm:mt-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50 sm:w-16" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50 sm:w-16" />
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* LEFT SIDE — Info */}
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl">
              Contact <span className="text-blue-500">Information</span>
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-400 sm:mt-4 sm:text-base sm:leading-8">
              Reach out through any of these channels. I typically respond
              within 24 hours. Let's turn your ideas into reality.
            </p>

            {/* Location strip */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-slate-900/50 px-4 py-2 backdrop-blur-lg sm:mt-6 sm:gap-3 sm:px-5 sm:py-3">
              <HiMapPin className="text-blue-400" size={18} />
              <span className="text-sm text-gray-300 sm:text-base">
                Available for Remote Work Worldwide
              </span>
            </div>

            {/* Contact Cards */}
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {contactCards.map((card, index) => (
                <ContactCard key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Socials */}
            <div className="mt-6 sm:mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 sm:mb-4 sm:text-sm">
                Connect with me
              </p>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white sm:h-12 sm:w-12"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white sm:h-12 sm:w-12"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="mailto:favourabel150@gmail.com"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white sm:h-12 sm:w-12"
                >
                  <FaEnvelope size={18} />
                </a>
                <a
                  href="https://wa.me/2349130593550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/50 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white sm:h-12 sm:w-12"
                >
                  <FaWhatsapp size={18} />
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
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-6 backdrop-blur-xl sm:p-8 md:p-10">
              {/* Top Glow Line */}
              <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              {/* Glow Orbs */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-600/10 blur-[80px]" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-600/10 blur-[80px]" />

              <div className="relative">
                <h3 className="mb-2 text-xl font-bold sm:text-2xl">
                  Send Me a Message
                </h3>
                <p className="mb-6 text-sm text-gray-400 sm:mb-8 sm:text-base">
                  Fill out the form below and I'll get back to you shortly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4 sm:space-y-5"
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 sm:left-5"
                        size={14}
                      />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`${inputBase} pl-11 sm:pl-12 ${
                          errors.name
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 sm:left-5"
                        size={14}
                      />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`${inputBase} pl-11 sm:pl-12 ${
                          errors.email
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 sm:left-5"
                        size={14}
                      />
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity"
                        className={`${inputBase} pl-11 sm:pl-12 ${
                          errors.subject
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
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
                        className="absolute left-4 top-4 text-gray-500 sm:left-5 sm:top-5"
                        size={14}
                      />
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        className={`${inputBase} resize-none pl-11 pt-3 sm:pl-12 sm:pt-4 ${
                          errors.message
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 sm:text-sm">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Success / Error Messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400 sm:px-5 sm:py-4 sm:text-base">
                      <FaCheck size={16} />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 sm:px-5 sm:py-4 sm:text-base">
                      <FaTimes size={16} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-3 sm:py-4 sm:text-lg"
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
                          size={16}
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
          className={`mt-16 transition-all duration-1000 ease-out sm:mt-20 lg:mt-24 ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 text-center backdrop-blur-xl sm:p-12 md:p-16">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[100px]" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-3xl sm:mb-6 sm:h-20 sm:w-20 sm:text-4xl">
                💡
              </div>

              <h3 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Ready to Bring Your Ideas to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Life?
                </span>
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-gray-400 sm:mb-10 sm:text-base sm:leading-8 md:text-lg">
                Let's collaborate to build modern, scalable, and impactful
                digital experiences that deliver real results.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <a
                  href="https://wa.me/2349130593550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/40 sm:gap-3 sm:px-10 sm:py-5 sm:text-lg"
                >
                  <span>Let's Talk</span>
                  <HiArrowRight
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    size={20}
                  />
                </a>

                <a
                  href="mailto:favourabel150@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/[0.06] sm:gap-3 sm:px-10 sm:py-5 sm:text-lg"
                >
                  <span>Hire Me</span>
                  <FaEnvelope
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={16}
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
      <BackToTop />

      
    </>
  );
}