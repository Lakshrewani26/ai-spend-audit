"use client"

import { useState, useEffect } from "react"

type Props = {
  tools: { name: string; plan: string }[]
  useCase: string
  teamSize: number
  totalMonthlySavings: number
  results: { tool: string; savings: number; recommendation: string }[]
}

export default function AuditSummary({ tools, useCase, teamSize, totalMonthlySavings, results }: Props) {
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tools, useCase, teamSize, totalMonthlySavings, results }),
        })
        const data = await res.json()
        setSummary(data.summary)
      } catch (error) {
        console.error(error)
        setSummary(`Your team of ${teamSize} has been audited. You could save $${totalMonthlySavings}/month by optimizing your AI tool stack.`)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Your Personalized Summary
      </h3>
      {loading ? (
        <div className="animate-pulse h-20 bg-gray-100 rounded-lg" />
      ) : (
        <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
      )}
    </div>
  )
}