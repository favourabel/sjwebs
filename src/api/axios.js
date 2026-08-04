import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // for Vite
  // baseURL: process.env.REACT_APP_API_URL, // for CRA
});

// Auto-attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;