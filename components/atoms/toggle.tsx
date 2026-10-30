"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    apply(isDark);
    setDark(isDark);
  }, []);

  function apply(isDark: boolean) {
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
    html.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function toggle() {
    const next = !dark;
    setDark(next);
    apply(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="toggle theme"
      className="flex items-center justify-center"
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "var(--radius-sm)",
        color: "var(--fg-muted)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "var(--transition-fast)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--fg-primary)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {dark ? (
        <i className="bi bi-sun-fill" style={{ fontSize: "14px" }} />
      ) : (
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <i className="bi bi-sun" style={{ fontSize: "14px" }} />
          <i className="bi bi-slash-lg" style={{ fontSize: "16px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </span>
      )}
    </button>
  );
}
