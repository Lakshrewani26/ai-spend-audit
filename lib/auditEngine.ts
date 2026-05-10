// Official pricing data (sourced from PRICING_DATA.md)
const OFFICIAL_PRICING: Record<string, Record<string, number>> = {
  "Cursor": {
    "Hobby": 0,
    "Pro": 20,
    "Pro+": 60,
    "Ultra": 200,
    "Teams": 40,
    "Enterprise": 0, // custom
  },
  "GitHub Copilot": {
    "Individual": 10,
    "Business": 19,
    "Enterprise": 39,
  },
  "Claude": {
    "Free": 0,
    "Pro": 20,
    "Max": 100,
    "Team Standard": 25,
    "Team Premium": 125,
    "Enterprise": 20,
  },
  "ChatGPT": {
    "Free": 0,
    "Go": 16,
    "Plus": 20,
    "Pro": 200,
    "Business": 30,
    "Enterprise": 0, // custom
  },
  "Anthropic API": {
    "Pay as you go": 0,
  },
  "OpenAI API": {
    "Pay as you go": 0,
  },
  "Gemini": {
    "Free": 0,
    "AI Plus": 4.99,
    "AI Pro": 19.99,
    "AI Ultra": 249.99,
  },
  "Windsurf": {
    "Free": 0,
    "Pro": 20,
    "Max": 200,
    "Teams": 40,
    "Enterprise": 0, // custom
  },
}

export type ToolEntry = {
  name: string
  plan: string
  seats: number
  monthlySpend: number
}

export type AuditResult = {
  tool: string
  plan: string
  seats: number
  currentSpend: number
  recommendation: string
  suggestedPlan: string
  savings: number
  reason: string
}

export type AuditSummary = {
  results: AuditResult[]
  totalMonthlySavings: number
  totalAnnualSavings: number
}

export function runAudit(
  tools: ToolEntry[],
  teamSize: number,
  useCase: string
): AuditSummary {
  const results: AuditResult[] = []

  // Check for redundant coding tools
  const codingTools = tools.filter(t =>
    ["Cursor", "GitHub Copilot", "Windsurf"].includes(t.name)
  )

  for (const tool of tools) {
    const officialPrice = OFFICIAL_PRICING[tool.name]?.[tool.plan] ?? 0
    const expectedSpend = officialPrice * tool.seats
    let recommendation = "No changes needed"
    let suggestedPlan = tool.plan
    let savings = 0
    let reason = "You are on the optimal plan for your usage."

    // Rule 1 — Actual spend vs official price
    if (officialPrice > 0 && tool.monthlySpend > expectedSpend * 1.1) {
      savings = tool.monthlySpend - expectedSpend
      recommendation = `You may have hidden overages. Expected spend is $${expectedSpend}/mo`
      suggestedPlan = tool.plan
      reason = "Your actual spend is more than 10% above the official plan price — check for overages or unused seats."
    }

    // Rule 2 — Wrong plan for team size
    if (tool.name === "ChatGPT" && tool.plan === "Business" && tool.seats <= 2) {
      const plusCost = 20 * tool.seats
      savings = tool.monthlySpend - plusCost
      recommendation = "Downgrade to Plus"
      suggestedPlan = "Plus"
      reason = "Business plan is overkill for 1-2 users. Plus plan has the same core features."
    }

    if (tool.name === "Claude" && tool.plan === "Team Standard" && tool.seats <= 2) {
      const proCost = 20 * tool.seats
      savings = tool.monthlySpend - proCost
      recommendation = "Downgrade to Pro"
      suggestedPlan = "Pro"
      reason = "Team plan is designed for 3+ users. Pro plan is sufficient for 1-2 users."
    }

    if (tool.name === "GitHub Copilot" && tool.plan === "Business" && tool.seats === 1) {
      const individualCost = 10
      savings = tool.monthlySpend - individualCost
      recommendation = "Downgrade to Individual"
      suggestedPlan = "Individual"
      reason = "Business plan adds team features you don't need as a solo user."
    }

    if (tool.name === "Cursor" && tool.plan === "Teams" && tool.seats <= 2) {
      const proCost = 20 * tool.seats
      savings = tool.monthlySpend - proCost
      recommendation = "Downgrade to Pro"
      suggestedPlan = "Pro"
      reason = "Teams plan is designed for 3+ users. Pro plan covers all individual needs."
    }

    // Rule 3 — Redundant coding tools
    if (
      codingTools.length >= 2 &&
      tool.name === "GitHub Copilot" &&
      tools.some(t => t.name === "Cursor" || t.name === "Windsurf")
    ) {
      savings = tool.monthlySpend
      recommendation = "Consider dropping GitHub Copilot"
      suggestedPlan = "None"
      reason = "You are already paying for Cursor or Windsurf which covers the same AI coding features."
    }

    // Rule 4 — Cheaper alternative based on use case
    if (
      tool.name === "ChatGPT" &&
      tool.plan === "Business" &&
      useCase === "Coding"
    ) {
      const cursorCost = 20 * tool.seats
      if (cursorCost < tool.monthlySpend) {
        savings = tool.monthlySpend - cursorCost
        recommendation = "Switch to Cursor Pro for coding"
        suggestedPlan = "Cursor Pro"
        reason = "Cursor is purpose-built for coding and cheaper than ChatGPT Business for engineering teams."
      }
    }

    results.push({
      tool: tool.name,
      plan: tool.plan,
      seats: tool.seats,
      currentSpend: tool.monthlySpend,
      recommendation,
      suggestedPlan,
      savings: Math.max(0, savings),
      reason,
    })
  }

  const totalMonthlySavings = results.reduce((sum, r) => sum + r.savings, 0)
  const totalAnnualSavings = totalMonthlySavings * 12

  return {
    results,
    totalMonthlySavings,
    totalAnnualSavings,
  }
}