"use client"

import { useState } from "react"

type Props = {
  auditId: string
  monthlySavings: number
}

export default function EmailCapture({ auditId, monthlySavings }: Props) {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, company, role }),
      })
      if (res.ok) setSubmitted(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold text-blue-800 mb-2">
          Report sent!
        </h3>
        <p className="text-blue-700 text-sm">
          Check your inbox for your full audit report.
          {monthlySavings > 500 && " Our team will reach out about Credex savings opportunities."}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Get your full report
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        We will email you the complete audit with detailed recommendations.
      </p>

      {/* Honeypot field - hidden from users */}
      <input type="text" name="website" className="hidden" tabIndex={-1} />

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Your email (required)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        />
        <input
          type="text"
          placeholder="Company name (optional)"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        />
        <input
          type="text"
          placeholder="Your role (optional)"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          className="w-full bg-black text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send me the report"}
        </button>
      </div>
    </div>
  )
}