// ═══════════════════════════════════════════════════════════════
//  APP.JSX — Main Application Entry
//  Handles all routing, layout, and access protection
//
//  🔄 USER FLOW:
//    1. Homepage (/) → user clicks "Login"
//    2. Login page (/login) → enters admin credentials
//    3. If valid → redirected to Dashboard (/dashboard)
//    4. If not logged in and visits /dashboard → back to /login
//
//  🎨 LAYOUT RULES:
//    - Public pages (Homepage, Resume) → SHOW Navbar
//    - Admin pages (Login, Dashboard)  → HIDE Navbar
// ═══════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────
//  1. IMPORTS
// ─────────────────────────────────────────────

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

// ─── Shared Components ───
import Navbar from "./component/Navbar.jsx";

// ─── Public Pages ───
import HomePartOne from "./pages/HomePartOne.jsx";
import Resume from "./pages/Resume.jsx";

// ─── Admin Pages ───
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";



// ═══════════════════════════════════════════════════════════════
//  2. UTILITY: SCROLL TO TOP
//  Smoothly scrolls to top when the URL changes
// ═══════════════════════════════════════════════════════════════

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}



// ═══════════════════════════════════════════════════════════════
//  3. ROUTE GUARDS
//  Controls who can access which pages
// ═══════════════════════════════════════════════════════════════

/**
 * PrivateRoute
 * Protects admin-only pages (like Dashboard)
 * - Logged in  → allow access
 * - Not logged in → redirect to /login
 */
function PrivateRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

/**
 * PublicRoute
 * Prevents logged-in admins from re-visiting login page
 * - Logged in → redirect to /dashboard
 * - Not logged in → show the login page
 */
function PublicRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}



// ═══════════════════════════════════════════════════════════════
//  4. LAYOUTS
//  Two layout templates:
//    - PublicLayout: shows Navbar (for public pages)
//    - AdminLayout:  no Navbar (for login and dashboard)
// ═══════════════════════════════════════════════════════════════

/**
 * PublicLayout
 * Wraps all public pages with the Navbar
 */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the current public page */}
    </>
  );
}

/**
 * AdminLayout
 * Wraps admin pages without any Navbar (clean UI)
 */
function AdminLayout() {
  return <Outlet />; {/* Renders the current admin page */}
}



// ═══════════════════════════════════════════════════════════════
//  5. MAIN APP COMPONENT
//  Defines all routes and their layouts
// ═══════════════════════════════════════════════════════════════

export default function App() {
  return (
    <Router>
      {/* Handles auto-scroll on route change */}
      <ScrollToTop />

      <Routes>

        {/* ─────────────────────────────────
            🌐 PUBLIC ROUTES (with Navbar)
        ───────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePartOne />} />
          <Route path="/resume" element={<Resume />} />
        </Route>


        {/* ─────────────────────────────────
            🔐 ADMIN ROUTES (no Navbar)
        ───────────────────────────────── */}
        <Route element={<AdminLayout />}>
          {/* Login → only accessible if NOT logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Dashboard → only accessible if logged in */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>


        {/* ─────────────────────────────────
            🚫 CATCH-ALL — Unknown URLs
        ───────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}