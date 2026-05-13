"use client"

import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light")
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