import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaDownload,
  FaPrint,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaLightbulb,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi2";

// ==================== RESUME DATA ====================

const resumeData = {
  personalInfo: {
    name: "Osifo Favour Osarunmwense",
    title: "Junior MERN Stack JavaScript Developer",
    phone: "+234 9130593550",
    email: "favourabel150@gmail.com",
    location: "Rivers State, Nigeria",
    github: "https://github.com/favourabel",
    portfolio: "Currently in Development",
  },

  summary:
    "Passionate and detail-oriented Junior Full-Stack Developer specializing in the MERN stack, with hands-on experience building responsive, scalable, and user-focused web applications using HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, and Supabase. Experienced in developing full-stack applications, REST APIs, database-driven solutions, authentication systems, and modern user interfaces. Proficient in leveraging AI-powered development tools to accelerate software development workflows, including code implementation, debugging, Git/GitHub troubleshooting, deployment optimization, and backend problem-solving. Possesses strong analytical, problem-solving, and collaboration skills, with a commitment to continuous learning and delivering efficient, high-quality software solutions.",

  education: [
    {
      institution: "Delta State University (DELSU)",
      degree: "National Diploma (ND)",
      graduation: "Expected Graduation: 2026",
      location: "Delta State, Nigeria",
    },
  ],

  experience: [
    {
      title: "Independent Developer & Personal Projects",
      period: "2026 – Present",
      achievements: [
        "Designed and developed responsive websites and full-stack web applications using modern frontend and backend technologies.",
        "Built scalable applications using the MERN stack and Backend-as-a-Service platforms.",
        "Implemented REST APIs, authentication systems, database integrations, and deployment workflows.",
        "Applied Git and GitHub version control practices for project management and collaboration.",
        "Leveraged AI-assisted development tools to accelerate software development, debugging, and deployment processes.",
      ],
    },
  ],

  projects: [
    {
      name: "Personal Portfolio Website",
      technologies: ["React.js", "JavaScript", "Tailwind CSS", "Node.js"],
      liveLink: null,
      githubLink: null,
      description: [
        "Designed and developed a modern, responsive portfolio website to showcase technical skills, projects, and professional experience.",
        "Implemented dynamic project filtering, interactive UI components, and smooth user interactions.",
        "Optimized website performance, accessibility, and mobile responsiveness.",
        "Built reusable and maintainable components following modern frontend development practices.",
        "Applied AI-assisted development workflows to improve productivity, debugging, and optimization processes.",
      ],
    },
    {
      name: "Unicode University Management System",
      technologies: ["React.js", "JavaScript", "Supabase", "Supabase Auth"],
      liveLink: "https://my-unicode.vercel.app",
      githubLink: null,
      description: [
        "Developed a full-stack university management platform featuring dedicated Admin and Student dashboards.",
        "Built a scalable backend infrastructure using Supabase for database management, authentication, and API services.",
        "Implemented secure user authentication and authorization using Supabase Auth.",
        "Designed and managed relational database structures to support academic and administrative workflows.",
        "Developed and integrated backend APIs for application functionality and data operations.",
        "Implemented data validation, access control, and secure backend practices.",
        "Tested and optimized backend functionality to ensure reliability, security, and performance.",
      ],
    },
    {
      name: "E-Commerce Pastry Ordering Website",
      technologies: ["React.js", "JavaScript", "Supabase", "CSS3"],
      liveLink: "https://my-dominion-azf7.vercel.app",
      githubLink: null,
      description: [
        "Developed a responsive full-stack pastry ordering web application with a modern and user-friendly interface.",
        "Integrated Supabase as the backend service for database management, API operations, and secure data storage.",
        "Implemented customer order and delivery information submission with secure storage in the Supabase database.",
        "Developed dynamic frontend and backend interactions to support customer ordering workflows.",
        "Created reusable, scalable, and maintainable application components.",
        "Tested and optimized application functionality to ensure reliable data handling and a seamless user experience.",
      ],
    },
  ],

  technicalSkills: {
    "Frontend Development": [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Tailwind CSS",
      "Responsive Web Design",
    ],
    "Backend Development": [
      "Node.js",
      "Express.js",
      "REST API Development",
      "Authentication & Authorization",
      "CRUD Operations",
    ],
    Database: ["MongoDB", "Mongoose", "Supabase", "Supabase Authentication"],
    "Mobile Development": ["React Native"],
    "Tools & Workflow": [
      "Git",
      "GitHub",
      "Postman",
      "Visual Studio Code",
      "npm",
      "API Integration",
    ],
    "AI-Assisted Development": ["ChatGPT", "GitHub Copilot"],
  },

  certifications: [
    "Responsive Web Design Certification",
    "JavaScript Certification",
    "React.js Certification",
    "Node.js Certification",
    "MongoDB Certification",
  ],

  softSkills: [
    "Problem Solving",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Attention to Detail",
  ],

  additionalInfo: [
    "Available for Remote and On-Site Opportunities",
    "Open to Junior Frontend, Backend, and Full-Stack Developer Roles",
    "Passionate about AI-assisted software development and modern web technologies",
    "Committed to continuous learning, professional growth, and building scalable digital solutions",
  ],
};

// ==================== RESUME COMPONENT ====================

export default function Resume({ onBack }) {

    const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("summary");
  const [isVisible, setIsVisible] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("PDF download will be available soon! You can use Print to save as PDF for now.");
  };

  const sections = [
    { id: "summary", label: "Summary", icon: FaLightbulb },
    { id: "experience", label: "Experience", icon: FaBriefcase },
    { id: "projects", label: "Projects", icon: FaCode },
    { id: "skills", label: "Skills", icon: FaCheckCircle },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "certifications", label: "Certifications", icon: FaCertificate },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-section { page-break-inside: avoid; }
          body { background: white !important; color: black !important; }
          * { color: black !important; }
        }
      `}</style>

      {/* Navigation Bar - No Print */}
      <nav className="no-print fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-blue-400"
          >
            <FaArrowLeft size={18} />
            <span className="font-semibold">Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              <FaPrint size={16} />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl"
            >
              <FaDownload size={16} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        {/* Header Section */}
        <div
          ref={resumeRef}
          className={`print-section mb-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl transition-all duration-1000 md:p-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Name & Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              {resumeData.personalInfo.name}
            </h1>
            <p className="text-xl font-medium text-blue-400 md:text-2xl">
              {resumeData.personalInfo.title}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 text-sm text-gray-400">
            <a
              href={`tel:${resumeData.personalInfo.phone}`}
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <FaPhone size={14} />
              <span>{resumeData.personalInfo.phone}</span>
            </a>

            <span className="hidden sm:inline">|</span>

            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <FaEnvelope size={14} />
              <span>{resumeData.personalInfo.email}</span>
            </a>

            <span className="hidden sm:inline">|</span>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt size={14} />
              <span>{resumeData.personalInfo.location}</span>
            </div>

            <span className="hidden sm:inline">|</span>

            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <FaGithub size={14} />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Section Navigation - No Print */}
        <div className="no-print mb-8 flex flex-wrap justify-center gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 font-semibold transition-all duration-300 ${
                  activeSection === section.id
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "border-white/10 bg-slate-900/50 text-gray-300 hover:border-blue-500/50 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Summary */}
          {(activeSection === "summary" || window.matchMedia("print").matches) && (
            <section
              id="summary"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                  <FaLightbulb className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Professional Summary</h2>
              </div>

              <p className="leading-8 text-gray-300">{resumeData.summary}</p>
            </section>
          )}

          {/* Experience */}
          {(activeSection === "experience" || window.matchMedia("print").matches) && (
            <section
              id="experience"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10">
                  <FaBriefcase className="text-green-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Experience</h2>
              </div>

              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="mt-1 text-blue-400">{exp.period}</p>
                    </div>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <HiCheckCircle
                            className="mt-1 flex-shrink-0 text-blue-400"
                            size={18}
                          />
                          <span className="leading-7 text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {(activeSection === "projects" || window.matchMedia("print").matches) && (
            <section
              id="projects"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10">
                  <FaCode className="text-purple-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Projects</h2>
              </div>

              <div className="space-y-8">
                {resumeData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-6"
                  >
                    <div className="mb-4">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-white">
                          {project.name}
                        </h3>
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-print flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400 transition-colors hover:bg-blue-500/20"
                          >
                            <span>Live Demo</span>
                            <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {project.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <HiCheckCircle
                            className="mt-1 flex-shrink-0 text-blue-400"
                            size={16}
                          />
                          <span className="text-sm leading-6 text-gray-300">
                            {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          {(activeSection === "skills" || window.matchMedia("print").matches) && (
            <section
              id="skills"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <FaCheckCircle className="text-cyan-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Technical Skills</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(resumeData.technicalSkills).map(
                  ([category, skills]) => (
                    <div
                      key={category}
                      className="rounded-2xl border border-white/10 bg-slate-900/50 p-6"
                    >
                      <h3 className="mb-4 text-lg font-bold text-blue-400">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Soft Skills */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-green-400">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.softSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-sm text-green-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Education */}
          {(activeSection === "education" || window.matchMedia("print").matches) && (
            <section
              id="education"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
                  <FaGraduationCap className="text-amber-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Education</h2>
              </div>

              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-6"
                  >
                    <h3 className="text-xl font-bold text-white">
                      {edu.institution}
                    </h3>
                    <p className="mt-2 text-blue-400">{edu.degree}</p>
                    <p className="mt-1 text-gray-400">{edu.graduation}</p>
                    {edu.location && (
                      <p className="mt-1 text-sm text-gray-500">{edu.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {(activeSection === "certifications" ||
            window.matchMedia("print").matches) && (
            <section
              id="certifications"
              className="print-section rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10">
                  <FaCertificate className="text-pink-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Certifications
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {resumeData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4"
                  >
                    <HiCheckCircle className="flex-shrink-0 text-pink-400" size={20} />
                    <span className="text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
                <h3 className="mb-4 text-lg font-bold text-blue-400">
                  Additional Information
                </h3>
                <ul className="space-y-2">
                  {resumeData.additionalInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <HiCheckCircle
                        className="mt-0.5 flex-shrink-0 text-blue-400"
                        size={18}
                      />
                      <span className="leading-7 text-gray-300">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Footer CTA - No Print */}
        <div className="no-print mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 text-center backdrop-blur-xl md:p-12">
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">
            Interested in working together?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400">
            I'm currently available for remote and on-site opportunities. Let's discuss
            how I can contribute to your team!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl"
            >
              <FaEnvelope size={18} />
              <span>Email Me</span>
            </a>

            <a
              href="https://wa.me/2349130593550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              <FaPhone size={18} />
              <span>Call Me</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}