// ==================== IMPORTS ====================
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiMenu, HiX } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import SJ from "../assets/SJ.jpeg";

// ==================== NAVBAR COMPONENT ====================
export default function Navbar({ onNavigate }) {
  // ─── State: Controls mobile menu open/close ───
  const [open, setOpen] = useState(false);

  // ─── Hook: Lets us navigate between pages ───
  const navigate = useNavigate();

  // ─── Nav links list ───
  const links = ["home", "about", "skills", "projects", "services", "contact"];

  // ─── Smooth scroll to a section on the homepage ───
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* ───── Logo ───── */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <img src={SJ} alt="SJ Logo" className="h-[70px] w-[70px]" />
          </div>
          <div>
            <h1 className="font-bold">SJ Web Solutions</h1>
            <p className="text-xs text-gray-400">MERN Developer</p>
          </div>
        </button>

        {/* ───── Desktop Menu ───── */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 backdrop-blur-xl">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="capitalize rounded-full px-5 py-3 text-sm text-gray-300 transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ───── Login Button (Desktop) ───── */}
        <button
          onClick={() => navigate("/login")}
          className="group hidden lg:flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all"
        >
          <span>Login</span>
          <FaEnvelope
            className="transition-transform duration-300 group-hover:scale-110"
            size={18}
          />
        </button>

        {/* ───── Mobile Menu Toggle ───── */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
          {open ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* ───── Mobile Menu ───── */}
      {open && (
        <div className="mx-4 rounded-3xl border border-white/10 bg-slate-900/95 p-6 backdrop-blur-xl lg:hidden">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className="block w-full rounded-xl px-4 py-3 text-left capitalize text-gray-300 transition hover:bg-blue-600 hover:text-white"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* ───── Login Button (Mobile) ───── */}
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="group mt-4 flex w-full items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all"
          >
            <span>Login</span>
            <FaEnvelope
              className="transition-transform duration-300 group-hover:scale-110"
              size={18}
            />
          </button>
        </div>
      )}
    </nav>
  );
}