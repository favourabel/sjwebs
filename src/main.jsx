import React from "react";
import ReactDOM from "react-dom/client";
import { pdfjs } from "react-pdf";
import App from "./App";
import "./index.css"; // Tailwind import

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);