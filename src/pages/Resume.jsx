import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
  FaDownload,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaMobileAlt,
  FaFilePdf,
} from "react-icons/fa";

// ==================== RESUME FILES ====================
const resumes = {
  mern: {
    label: "Full-Stack / MERN Developer",
    icon: FaCode,
    file: "/mern-resume.pdf",
    downloadName: "Osifo-Favour-FullStack-Developer-Resume.pdf",
    color: "blue",
  },
  reactNative: {
    label: "React Native Developer",
    icon: FaMobileAlt,
    file: "/react-native-resume.pdf",
    downloadName: "Osifo-Favour-ReactNative-Resume.pdf",
    color: "purple",
  },
};


// ==================== RESUME COMPONENT ====================
export default function Resume({ onBack }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [activeResume, setActiveResume] = useState("mern");
  const [isVisible, setIsVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);
  const [loading, setLoading] = useState(true);

  const current = resumes[activeResume];

  // Fade-in on mount + scroll to top
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  // Reset loading whenever the user switches between resumes
  useEffect(() => {
    setLoading(true);
    setNumPages(null);
  }, [activeResume]);

  // Responsive PDF width based on container size
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(width > 900 ? 850 : width - 40);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle successful PDF load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  // Handle PDF download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = current.file;
    link.download = current.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ============ NAVIGATION BAR ============ */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-blue-400"
          >
            <FaArrowLeft size={18} />
            <span className="font-semibold">Back to Portfolio</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <FaDownload size={16} />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </nav>

      {/* ============ MAIN CONTENT ============ */}
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
        {/* Header */}
        <div
          className={`mb-10 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <FaFilePdf size={14} />
            <span>Professional Resume</span>
          </div>
          <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
            My Resume
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Toggle between my MERN Stack and React Native resumes below. Feel free to
            download whichever suits your needs.
          </p>
        </div>

        {/* ============ TOGGLE SWITCH ============ */}
        <div className="mb-10 flex justify-center">
          <div className="relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-2 backdrop-blur-xl">
            {Object.entries(resumes).map(([key, resume]) => {
              const Icon = resume.icon;
              const isActive = activeResume === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveResume(key)}
                  className={`relative z-10 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:text-base ${
                    isActive
                      ? resume.color === "blue"
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/40"
                        : "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/40"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{resume.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ PDF VIEWER ============ */}
        <div
          ref={containerRef}
          className={`overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-4 backdrop-blur-xl transition-all duration-700 sm:p-8 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Loading Skeleton */}
          {loading && (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500"></div>
              <p className="text-gray-400">Loading resume...</p>
            </div>
          )}

          {/* Actual PDF Rendered as Images */}
          <div className={`flex flex-col items-center gap-6 ${loading ? "hidden" : ""}`}>
            <Document
              file={current.file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading=""
              error={
                <div className="py-20 text-center text-red-400">
                  Failed to load PDF. Please make sure the file exists in the public folder.
                </div>
              }
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="mb-6 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-[1.01]"
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </Document>

            {numPages && (
              <p className="text-sm text-gray-500">
                Showing {numPages} page{numPages > 1 ? "s" : ""} · {current.label}
              </p>
            )}
          </div>
        </div>

        {/* ============ DOWNLOAD CTA ============ */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleDownload}
            className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-600/50"
          >
            <FaDownload size={18} className="transition-transform group-hover:translate-y-0.5" />
            <span>Download {current.label} Resume</span>
          </button>
        </div>

        {/* ============ CONTACT CTA ============ */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/50 to-slate-900/90 p-8 text-center backdrop-blur-xl md:p-12">
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">
            Interested in working together?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400">
            I'm currently available for remote and on-site opportunities. Let's discuss
            how I can contribute to your team!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:favourabel150@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <FaEnvelope size={18} />
              <span>Email Me</span>
            </a>

            <a
              href="https://wa.me/2349130593550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:scale-105"
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