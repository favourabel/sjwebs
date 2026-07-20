// ==================== IMPORTS ====================
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../src/component/Navbar.jsx";
import Footer from "../src/component/Footer.jsx";

import Homepage from "../src/pages/Homepage.jsx";
import Resume from "../src/pages/Resume.jsx";

// ==================== SCROLL TO TOP ON ROUTE CHANGE ====================
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// ==================== APP COMPONENT ====================
export default function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Navbar appears on all pages */}
      <Navbar />

      {/* Main Page Content */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>

      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
}