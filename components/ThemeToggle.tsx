"use client"

import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
  }, [dark])

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full border transition-all duration-300 hover:scale-110"
      style={{
        background: "var(--bg-card)",
        border: "1.5px solid var(--border)",
        color: "var(--text-primary)",
        boxShadow: "var(--shadow)",
      }}
      aria-label="Toggle theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  )
}