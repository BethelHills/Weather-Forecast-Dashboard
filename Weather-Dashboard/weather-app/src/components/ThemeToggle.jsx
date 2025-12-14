import React from "react";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button onClick={toggleTheme} className="glass px-3 py-2 rounded-full">
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
