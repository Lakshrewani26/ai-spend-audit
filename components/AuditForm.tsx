"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { runAudit } from "@/lib/auditEngine"

const TOOLS = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
  "Windsurf",
]

const PLANS: Record<string, string[]> = {
  "Cursor": ["Hobby", "Pro", "Pro+", "Ultra", "Teams", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  "Claude": ["Free", "Pro", "Max", "Team Standard", "Team Premium", "Enterprise"],
  "ChatGPT": ["Free", "Go", "Plus", "Pro", "Business", "Enterprise"],
  "Anthropic API": ["Pay as you go"],
  "OpenAI API": ["Pay as you go"],
  "Gemini": ["Free", "AI Plus", "AI Pro", "AI Ultra"],
  "Windsurf": ["Free", "Pro", "Max", "Teams", "Enterprise"],
}

const USE_CASES = ["Coding", "Writing", "Data", "Research", "Mixed"]

type ToolEntry = {
  name: string
  plan: string
  seats: number
  monthlySpend: number
}

type FormData = {
  tools: ToolEntry[]
  teamSize: number
  useCase: string
}

const defaultForm: FormData = {
  tools: [{ name: "Cursor", plan: "Pro", seats: 1, monthlySpend: 20 }],
  teamSize: 1,
  useCase: "Coding",
}

export default function AuditForm() {
  const [formData, setFormData] = useState<FormData>(defaultForm)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("auditForm")
    if (saved) {
      const parsed = JSON.parse(saved)
      setTimeout(() => setFormData(parsed), 0)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("auditForm", JSON.stringify(formData))
  }, [formData])

  const addTool = () => {
    setFormData(prev => ({
      ...prev,
      tools: [...prev.tools, { name: "Cursor", plan: "Pro", seats: 1, monthlySpend: 20 }]
    }))
  }

  const removeTool = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }))
  }

  const updateTool = (index: number, field: keyof ToolEntry, value: string | number) => {
    setFormData(prev => {
      const tools = [...prev.tools]
      tools[index] = { ...tools[index], [field]: value }
      if (field === "name") tools[index].plan = PLANS[value as string][0]
      return { ...prev, tools }
    })
  }

const handleSubmit = async () => {
  setLoading(true)
  try {
    const audit = runAudit(formData.tools, formData.teamSize, formData.useCase)
    
    // Generate unique ID
    const id = Math.random().toString(36).substring(2, 8)
    
    // Save to Supabase
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.from("audits").insert({
      id,
      tools: formData.tools,
      team_size: formData.teamSize,
      use_case: formData.useCase,
      savings_monthly: audit.totalMonthlySavings,
      savings_annual: audit.totalAnnualSavings,
    })
    
    // Redirect to results page
    router.push(`/audit/${id}`)
  } catch (error) {
    console.error(error)
    alert("Something went wrong. Please try again.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>
        Enter your AI tool spend
      </h2>

      {formData.tools.map((tool, index) => (
        <div
          key={index}
          className="rounded-xl p-4 mb-4 animate-fade-in"
          style={{ background: "var(--bg-primary)", border: "1.5px solid var(--border)" }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
              Tool {index + 1}
            </span>
            {formData.tools.length > 1 && (
              <button
                onClick={() => removeTool(index)}
                className="text-sm px-3 py-1 rounded-lg transition-all hover:scale-105"
                style={{ color: "var(--danger)", background: "rgba(239,68,68,0.1)" }}
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Tool</label>
              <select
                className="input-field"
                value={tool.name}
                onChange={e => updateTool(index, "name", e.target.value)}
              >
                {TOOLS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Plan</label>
              <select
                className="input-field"
                value={tool.plan}
                onChange={e => updateTool(index, "plan", e.target.value)}
              >
                {PLANS[tool.name].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Seats</label>
              <input
                type="number"
                min={1}
                className="input-field"
                value={tool.seats}
                onChange={e => updateTool(index, "seats", Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Monthly Spend ($)</label>
              <input
                type="number"
                min={0}
                className="input-field"
                value={tool.monthlySpend}
                onChange={e => updateTool(index, "monthlySpend", Math.max(0, parseFloat(e.target.value) || 0))}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addTool}
        className="w-full rounded-xl p-3 text-sm mb-6 transition-all hover:scale-[1.01]"
        style={{
          border: "1.5px dashed var(--border)",
          color: "var(--text-muted)",
          background: "transparent",
        }}
      >
        + Add another tool
      </button>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Team Size</label>
          <input
            type="number"
            min={1}
            className="input-field"
            value={formData.teamSize}
            onChange={e => setFormData(prev => ({ ...prev, teamSize: Math.max(1, parseInt(e.target.value) || 1) }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Primary Use Case</label>
          <select
            className="input-field"
            value={formData.useCase}
            onChange={e => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
          >
            {USE_CASES.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Generating..." : "Generate My Audit →"}
      </button>
    </div>
  )
}