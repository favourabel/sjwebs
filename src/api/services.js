import API from "./axios";

// Auth
export const loginAdmin = (data) => API.post("/auth/login", data);

// Projects
export const getProjects = () => API.get("/projects");
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (formData) => API.post("/projects", formData);
export const updateProject = (id, formData) => API.put(`/projects/${id}`, formData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);