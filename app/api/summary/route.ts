import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  let body: {
    tools: { name: string; plan: string }[]
    useCase: string
    teamSize: number
    totalMonthlySavings: number
    results: { tool: string; savings: number; recommendation: string }[]
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ summary: "Unable to generate summary." }, { status: 400 })
  }

  const { tools, useCase, teamSize, totalMonthlySavings, results } = body

  try {
    const toolSummary = results
      .map((r) =>
        r.savings > 0
          ? `${r.tool}: save $${r.savings}/mo by ${r.recommendation}`
          : `${r.tool}: already optimal`
      )
      .join(", ")

    const prompt = `You are an AI spend analyst. Write a 100-word personalized summary for a team audit.

Team details:
- Team size: ${teamSize} people
- Primary use case: ${useCase}
- Tools audited: ${tools.map((t) => `${t.name} (${t.plan})`).join(", ")}
- Total potential savings: $${totalMonthlySavings}/month
- Findings: ${toolSummary}

Write a friendly, specific, actionable 100-word summary. Be direct and mention specific tools and savings amounts. Do not use bullet points.`

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    })

    const summary = message.content[0].type === "text" ? message.content[0].text : ""
    return NextResponse.json({ summary })

  } catch (error) {
    console.error("Anthropic API error:", error)

    const fallback = `Based on your audit, your team of ${teamSize} could save $${totalMonthlySavings}/month on AI tools. Your ${useCase} focused stack has been analyzed and we have identified key optimization opportunities. By switching to more cost-effective plans and eliminating redundant tools, you can significantly reduce your monthly AI spend while maintaining the same productivity. Consider implementing these changes this month to start saving immediately.`

    return NextResponse.json({ summary: fallback })
  }
}