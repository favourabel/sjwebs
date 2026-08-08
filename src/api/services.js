import axios from "axios";

// Base URL — auto-switches between localhost and production
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
  // ✅ No default Content-Type — let axios decide per request
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------- AUTH ------------------- */
export const loginAdmin = (formData) =>
  API.post("/auth/login", formData, {
    headers: { "Content-Type": "application/json" },
  });

/* ------------------- PROJECTS ------------------- */
export const getProjects = () => API.get("/projects");

export const getProject = (id) => API.get(`/projects/${id}`);

// ✅ Create with FormData (supports image upload)
export const createProject = (formData) =>
  API.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Update with FormData (supports image upload)
export const updateProject = (id, formData) =>
  API.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProject = (id) => API.delete(`/projects/${id}`);

export default API;