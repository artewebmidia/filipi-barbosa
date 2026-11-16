import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./styles.css";
import "./civil.css";
import CivilPage from "./civil-page";

const root = document.getElementById("root");
if (root.hasChildNodes()) {
  hydrateRoot(root, <CivilPage />);
} else {
  createRoot(root).render(<CivilPage />);
}
