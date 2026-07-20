import { useState } from "react";
import { Link } from "react-router-dom";

import { HiMenu, HiX } from "react-icons/hi";
import SJ from "../assets/SJ.jpeg";

export default function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const links = ["home", "about", "skills", "projects", "services", "contact"];

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
        {/* Logo */}
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

        {/* Desktop Menu */}
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

        {/* Hire Me Button */}
        <button
          onClick={() => scrollToSection("contact")}
          className="hidden rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 lg:block"
        >
          Hire Me
        </button>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
          <button
            onClick={() => {
              scrollToSection("contact");
              setOpen(false);
            }}
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}