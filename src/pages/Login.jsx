import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiShield } from "react-icons/fi";
import { loginAdmin } from "../api/services";
import Navbar from "../component/Navbar";

/* ------------------------------------------------------------------ */
/*  Reusable Sub-Components (kept in same file for easy editing)      */
/* ------------------------------------------------------------------ */

/**
 * Animated background — subtle, mature glow (no harsh colors)
 */
const BackgroundEffects = () => (
  <>
    {/* Soft ambient glows */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]"
      />
    </div>

    {/* Subtle grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
  </>
);

/**
 * Card header — brand mark + welcome text
 */
const LoginHeader = () => (
  <div className="text-center mb-8">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 mb-5"
    >
      <FiShield className="text-blue-400 text-2xl" />
    </motion.div>
    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
      Admin Portal
    </h1>
    <p className="text-slate-400 text-sm">
      Sign in to manage your portfolio content
    </p>
  </div>
);

/**
 * Reusable input field with icon
 */
const InputField = ({ icon: Icon, rightSlot, ...props }) => (
  <div className="relative group">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors text-lg" />
    <input
      {...props}
      className="w-full pl-12 pr-12 py-3.5 bg-slate-900/60 border border-slate-700/60 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition-all"
    />
    {rightSlot && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</div>
    )}
  </div>
);

/**
 * Error banner
 */
const ErrorBanner = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-5 p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-sm text-center"
  >
    {message}
  </motion.div>
);

/**
 * Submit button with loading spinner
 */
const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full py-3.5 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-900/40"
  >
    {loading ? (
      <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
        />
        Signing in...
      </>
    ) : (
      <>
        <FiLogIn className="text-base" />
        Sign In
      </>
    )}
  </button>
);

/* ------------------------------------------------------------------ */
/*  Main Login Component                                              */
/* ------------------------------------------------------------------ */

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  // --- Handlers (logic unchanged) ---
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginAdmin(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("adminEmail", data.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#0a0f1c] relative overflow-hidden">
      {/* Navbar sits at the top, outside the centered flex area */}
      <Navbar />

      {/* Background layers */}
      <BackgroundEffects />

      {/* Centered content area (accounts for navbar height) */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/40 rounded-2xl shadow-2xl shadow-black/40 p-8 md:p-10">
            <LoginHeader />

            {error && <ErrorBanner message={error} />}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <InputField
                  icon={FiMail}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-2 uppercase tracking-wider">
                  Password
                </label>
                <InputField
                  icon={FiLock}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                />
              </div>

              <SubmitButton loading={loading} />
            </form>

            {/* Footer note */}
            <p className="text-center text-slate-500 text-xs mt-8 flex items-center justify-center gap-1.5">
              <FiShield className="text-slate-600" />
              Secured admin access only
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;