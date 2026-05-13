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
      <div className="card p-6 mb-6 text-center" style={{ background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
        <h3 className="text-lg font-bold mb-2" style={{ color: "var(--accent)" }}>Report sent!</h3>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Check your inbox for your full audit report.
          {monthlySavings > 500 && " Our team will reach out about Credex savings opportunities."}
        </p>
      </div>
    )
  }

  return (
    <div className="card p-6 mb-6" style={{ background: "var(--bg-card)" }}>
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Get your full report</h3>
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>We will email you the complete audit with detailed recommendations.</p>

      <input type="text" name="website" className="hidden" tabIndex={-1} />

      <div className="space-y-3">
        <input type="email" placeholder="Your email (required)" value={email} onChange={e => setEmail(e.target.value)} className="input-field" />
        <input type="text" placeholder="Company name (optional)" value={company} onChange={e => setCompany(e.target.value)} className="input-field" />
        <input type="text" placeholder="Your role (optional)" value={role} onChange={e => setRole(e.target.value)} className="input-field" />
        <button onClick={handleSubmit} disabled={loading || !email} className="btn-primary w-full">
          {loading ? "Sending..." : "Send me the report"}
        </button>
      </div>
    </div>
  )
}