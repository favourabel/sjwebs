// ═══════════════════════════════════════════════════════════════
//  DASHBOARD.JSX — Complete Admin Dashboard (Single File)
//  Manages all portfolio projects: View, Add, Edit, Delete
//  Built with React, Framer Motion, Tailwind CSS
// ═══════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────
//  1. IMPORTS
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiFolder,
  FiPlusCircle,
  FiLogOut,
  FiCode,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiStar,
  FiSave,
  FiX,
  FiUpload,
  FiPlus,
  FiArrowLeft,
  FiLoader,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/services";



// ─────────────────────────────────────────────
//  2. CONSTANTS
//  Reusable data used across multiple components
// ─────────────────────────────────────────────

// Category options for the project form dropdown
const CATEGORIES = ["Full Stack", "Frontend", "Backend", "Mobile", "UI/UX"];

// Tech badge colors — each technology gets its own color
const TECH_COLORS = {
  React: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  "Next.js": "text-white border-white/30 bg-white/10",
  "Node.js": "text-green-400 border-green-400/30 bg-green-400/10",
  "Express.js": "text-green-300 border-green-300/30 bg-green-300/10",
  MongoDB: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Tailwind CSS": "text-sky-400 border-sky-400/30 bg-sky-400/10",
  Redux: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  JWT: "text-red-400 border-red-400/30 bg-red-400/10",
  JavaScript: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  TypeScript: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  Firebase: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  PostgreSQL: "text-blue-300 border-blue-300/30 bg-blue-300/10",
  Python: "text-yellow-300 border-yellow-300/30 bg-yellow-300/10",
  CSS: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  HTML: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

// Default color if a technology is not in the map above
const DEFAULT_TECH_COLOR = "text-slate-300 border-slate-300/30 bg-slate-300/10";

// Framer Motion animation variants for staggered children
const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};



// ═══════════════════════════════════════════════════════════════
//  3. SIDEBAR COMPONENT
//  Fixed left navigation panel with menu links and logout
// ═══════════════════════════════════════════════════════════════

function Sidebar({ activeView, setActiveView, onAdd }) {
  const navigate = useNavigate();

  // Logout: Clear saved data and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  // Navigation menu items
  const menuItems = [
    { id: "home", label: "Dashboard", icon: FiHome },
    { id: "projects", label: "Projects", icon: FiFolder },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#0D1224] border-r border-white/5 flex flex-col z-50"
    >
      {/* ───── Logo Section ───── */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FiCode className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">SJ Admin</h2>
            <p className="text-slate-500 text-xs">Portfolio Manager</p>
          </div>
        </div>
      </div>

      {/* ───── Navigation Links ───── */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="text-lg" />
              {item.label}
            </motion.button>
          );
        })}

        {/* Add Project Button */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdd}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-all"
        >
          <FiPlusCircle className="text-lg" />
          Add Project
        </motion.button>
      </nav>

      {/* ───── Admin Info + Logout ───── */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SJ</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin</p>
            <p className="text-slate-500 text-xs truncate max-w-[140px]">
              {localStorage.getItem("adminEmail") || "admin@email.com"}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut className="text-lg" />
          Logout
        </motion.button>
      </div>
    </motion.aside>
  );
}



// ═══════════════════════════════════════════════════════════════
//  4. DASHBOARD HOME COMPONENT
//  Welcome screen with stats cards and quick action buttons
// ═══════════════════════════════════════════════════════════════

function DashboardHome({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects on mount to calculate stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate stats from projects data
  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const techCount = [...new Set(projects.flatMap((p) => p.technologies))].length;

  // Stats cards configuration
  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FiFolder,
      color: "from-blue-500 to-blue-700",
      shadow: "shadow-blue-500/30",
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: FiStar,
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/30",
    },
    {
      label: "Technologies",
      value: techCount,
      icon: FiCode,
      color: "from-emerald-500 to-green-700",
      shadow: "shadow-emerald-500/30",
    },
  ];

  return (
    <div>
      {/* ───── Welcome Header ───── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, <span className="text-blue-400">Developer</span> 👋
        </h1>
        <p className="text-slate-400">
          Manage your portfolio projects from here.
        </p>
      </motion.div>

      {/* ───── Stats Cards ───── */}
      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={STAGGER_ITEM}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl bg-[#111827] border border-white/5 p-6"
            >
              {/* Background Glow Effect */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 blur-3xl rounded-full`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="text-white text-xl" />
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-3xl font-bold">
                  {loading ? "..." : stat.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ───── Quick Action Buttons ───── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* View Projects */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("projects")}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <FiFolder className="text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">View Projects</p>
                <p className="text-slate-500 text-sm">Manage all your projects</p>
              </div>
            </div>
            <FiArrowRight className="text-slate-500 group-hover:text-blue-400 transition-colors" />
          </motion.button>

          {/* Add New Project */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("form")}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FiPlusCircle className="text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Add New Project</p>
                <p className="text-slate-500 text-sm">Create a new portfolio project</p>
              </div>
            </div>
            <FiArrowRight className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════════
//  5. PROJECT CARD COMPONENT
//  Displays a single project with image, details, and actions
// ═══════════════════════════════════════════════════════════════

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="relative group rounded-2xl bg-[#111827] border border-white/5 overflow-hidden hover:border-blue-500/20 transition-all"
    >
      {/* ───── Featured Badge ───── */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
          <FiStar className="text-amber-400 text-xs" />
          <span className="text-amber-400 text-xs font-medium">Featured</span>
        </div>
      )}

      {/* ───── Project Image ───── */}
      <div className="relative h-48 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <HiSparkles className="text-slate-500 text-3xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
      </div>

      {/* ───── Card Content ───── */}
      <div className="p-5">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 text-xs font-medium text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/10">
            {project.category || "Full Stack"}
          </span>
          <span className="text-slate-500 text-xs">{project.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-white text-lg font-bold mb-2">{project.title}</h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 text-xs font-medium rounded-full border ${
                TECH_COLORS[tech] || DEFAULT_TECH_COLOR
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="flex items-center gap-2 mb-4">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiGithub /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>

        {/* ───── Edit / Delete Buttons ───── */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(project)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
          >
            <FiEdit2 className="text-sm" /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(project._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
          >
            <FiTrash2 className="text-sm" /> Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}



// ═══════════════════════════════════════════════════════════════
//  6. PROJECT LIST COMPONENT
//  Displays all projects in a grid with search and delete
// ═══════════════════════════════════════════════════════════════

function ProjectList({ onEdit, onAdd }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all projects when component loads
useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {
    setLoading(true);
    const { data } = await getProjects();
    console.log("🔍 FULL RESPONSE:", data);        // ← ADD THIS
    console.log("🔍 FIRST PROJECT:", data[0]);     // ← ADD THIS
    setProjects(data);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
  } finally {
    setLoading(false);
  }
};

  // Delete a project after user confirms
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete project");
    }
  };

  // Filter projects based on search input
  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="text-blue-400 text-3xl" />
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* ───── Header with Search + Add Button ───── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">
            {projects.length} project{projects.length !== 1 && "s"} total
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-[#111827] border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 w-64"
            />
          </div>

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
          >
            <FiPlusCircle />
            Add Project
          </motion.button>
        </div>
      </motion.div>

      {/* ───── Projects Grid or Empty State ───── */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <HiSparkles className="text-slate-600 text-5xl mx-auto mb-4" />
          <p className="text-slate-500 text-lg mb-4">
            {search ? "No projects match your search" : "No projects yet"}
          </p>
          {!search && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"
            >
              Create Your First Project
            </motion.button>
          )}
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}



// ═══════════════════════════════════════════════════════════════
//  7. PROJECT FORM COMPONENT
//  Handles both creating new and editing existing projects
// ═══════════════════════════════════════════════════════════════

function ProjectForm({ project, onSaved, onCancel }) {
  // Are we editing an existing project or creating a new one?
  const isEditing = Boolean(project);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "Full Stack",
  date: "",
  codeUrl: "",
  liveUrl: "",
  backendCodeUrl: "",   // ✅ NEW
  backendLiveUrl: "",   // ✅ NEW
  featured: false,
});

  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill form when editing an existing project
  useEffect(() => {
  if (project) {
    setFormData({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "Full Stack",
      date: project.date || "",
      codeUrl: project.codeUrl || "",
      liveUrl: project.liveUrl || "",
      backendCodeUrl: project.backendCodeUrl || "",   
      backendLiveUrl: project.backendLiveUrl || "",  
      featured: project.featured || false,
    });
    setTechnologies(project.technologies || []);
    setImagePreview(project.image || null);
  }
}, [project]);

  // Update form field values
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a technology tag
  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput("");
    }
  };

  // Remove a technology tag
  const removeTech = (tech) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  // Handle image file selection and preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form — create or update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("date", formData.date);
      data.append("codeUrl", formData.codeUrl);
      data.append("liveUrl", formData.liveUrl);
      data.append("backendCodeUrl", formData.backendCodeUrl);   
      data.append("backendLiveUrl", formData.backendLiveUrl);  
      data.append("featured", formData.featured);
      data.append("technologies", JSON.stringify(technologies));
      if (imageFile) data.append("image", imageFile);

      if (isEditing) {
        await updateProject(project._id, data);
      } else {
        await createProject(data);
      }

      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ───── Header ───── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCancel}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <FiArrowLeft />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {isEditing
              ? "Update your project details"
              : "Fill in the details to create a new project"}
          </p>
        </div>
      </motion.div>

      {/* ───── Error Message ───── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* ───── Form ───── */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* ─── LEFT COLUMN ─── */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Magnific Editing Studio"
              className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Brief description of your project..."
              className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
          </div>

          {/* Category + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Date *
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                placeholder="e.g. May 2026"
                className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>

        {/* Frontend URLs */}
<div>
  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">
    🎨 Frontend Links
  </p>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-slate-300 text-sm font-medium mb-2">
        Frontend GitHub URL
      </label>
      <input
        type="url"
        name="codeUrl"
        value={formData.codeUrl}
        onChange={handleChange}
        placeholder="https://github.com/..."
        className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
    </div>

    <div>
      <label className="block text-slate-300 text-sm font-medium mb-2">
        Frontend Live URL
      </label>
      <input
        type="url"
        name="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        placeholder="https://..."
        className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
    </div>
  </div>
</div>

{/* ✅ Backend URLs — only show for Full Stack or Backend projects */}
{(formData.category === "Full Stack" || formData.category === "Backend") && (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
      ⚙️ Backend Links (Optional)
    </p>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Backend GitHub URL
        </label>
        <input
          type="url"
          name="backendCodeUrl"
          value={formData.backendCodeUrl}
          onChange={handleChange}
          placeholder="https://github.com/..."
          className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Backend Live/API URL
        </label>
        <input
          type="url"
          name="backendLiveUrl"
          value={formData.backendLiveUrl}
          onChange={handleChange}
          placeholder="https://api..."
          className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>
    </div>
  </div>
)}

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-blue-600 transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
              Mark as Featured
            </span>
          </label>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Project Image
            </label>
            <div
              onClick={() => document.getElementById("imageInput").click()}
              className="relative border-2 border-dashed border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500/40 transition-all group"
            >
              {imagePreview ? (
                <div className="relative h-56">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center gap-3 text-slate-500">
                  <FiUpload className="text-3xl" />
                  <p className="text-sm">Click to upload image</p>
                  <p className="text-xs text-slate-600">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </div>

          {/* Technologies Input */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Technologies
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="e.g. React"
                className="flex-1 px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTech}
                className="px-4 py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
              >
                <FiPlus />
              </motion.button>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {technologies.map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-full"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-blue-400 hover:text-red-400 transition-colors"
                  >
                    <FiX className="text-xs" />
                  </button>
                </motion.span>
              ))}
            </div>
          </div>

          {/* ───── Submit / Cancel Buttons ───── */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FiLoader />
                  </motion.div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  {isEditing ? "Update Project" : "Create Project"}
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-white/5 text-slate-400 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════════
//  8. MAIN DASHBOARD COMPONENT (DEFAULT EXPORT)
//  This is the entry point — controls which view to display
// ═══════════════════════════════════════════════════════════════

export default function Dashboard() {
  // ─── Which panel is currently visible ───
  const [activeView, setActiveView] = useState("home");
  // ─── Which project is being edited (null = adding new) ───
  const [editingProject, setEditingProject] = useState(null);

  // Switch to edit mode with selected project data
  const handleEdit = (project) => {
    setEditingProject(project);
    setActiveView("form");
  };

  // Switch to add mode (empty form)
  const handleAdd = () => {
    setEditingProject(null);
    setActiveView("form");
  };

  // After saving, go back to project list
  const handleSaved = () => {
    setEditingProject(null);
    setActiveView("projects");
  };

  // Decide which panel to render based on activeView
  const renderView = () => {
    switch (activeView) {
      case "home":
        return <DashboardHome onNavigate={setActiveView} />;
      case "projects":
        return <ProjectList onEdit={handleEdit} onAdd={handleAdd} />;
      case "form":
        return (
          <ProjectForm
            project={editingProject}
            onSaved={handleSaved}
            onCancel={() => setActiveView("projects")}
          />
        );
      default:
        return <DashboardHome onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex">
      {/* Left Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onAdd={handleAdd}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}