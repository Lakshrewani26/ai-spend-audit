import { createClient } from "@supabase/supabase-js"
import { runAudit } from "@/lib/auditEngine"
import { notFound } from "next/navigation"
import ShareButton from "@/components/ShareButton"
import EmailCapture from "@/components/EmailCapture"
import AuditSummary from "@/components/AuditSummary"
import Link from "next/link"
import Background from "@/components/Background"
import ThemeToggle from "@/components/ThemeToggle"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: audit } = await supabase
    .from("audits")
    .select("savings_monthly, savings_annual")
    .eq("id", id)
    .single()

  if (!audit) return {}

  return {
    title: `I could save $${audit.savings_monthly}/mo on AI tools — AI Spend Audit`,
    description: `My team could save $${audit.savings_annual}/year by optimizing our AI tool stack. Find out how much you could save.`,
    openGraph: {
      title: `I could save $${audit.savings_monthly}/mo on AI tools`,
      description: `My team could save $${audit.savings_annual}/year by optimizing our AI tool stack.`,
      type: "website",
      url: `https://ai-spend-audit-kappa.vercel.app/audit/${id}`,
    },
    twitter: {
      card: "summary",
      title: `I could save $${audit.savings_monthly}/mo on AI tools`,
      description: `My team could save $${audit.savings_annual}/year by optimizing our AI tool stack.`,
    },
  }
}

export default async function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: audit } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single()

  if (!audit) return notFound()

  const result = runAudit(audit.tools, audit.team_size, audit.use_case)

  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg-primary)" }}>
      <Background />
      <ThemeToggle />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">

        <div className="card p-8 mb-6 text-center animate-slide-up" style={{ background: "linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%)" }}>
          <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-widest">Potential Monthly Savings</p>
          <h1 className="text-6xl font-bold text-white mb-1">${result.totalMonthlySavings.toFixed(0)}<span className="text-3xl">/mo</span></h1>
          <p className="text-white/80 text-xl mt-2">${result.totalAnnualSavings.toFixed(0)} saved per year</p>
        </div>

        <div className="card p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Tool by Tool Breakdown</h2>
          {result.results.map((r, i) => (
            <div key={i} className="py-4 transition-all hover:translate-x-1" style={{ borderBottom: i < result.results.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{r.tool}</span>
                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{r.plan}</span>
                </div>
                {r.savings > 0 ? (
                  <span className="font-bold text-sm" style={{ color: "var(--success)" }}>Save ${r.savings.toFixed(0)}/mo</span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--success-light)", color: "var(--success)" }}>Optimal ✓</span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{r.reason}</p>
              {r.savings > 0 && (
                <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>{r.recommendation}</p>
              )}
            </div>
          ))}
        </div>

        {result.totalMonthlySavings > 500 && (
          <div className="card p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.2s", background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <h3 className="text-xl font-bold text-white mb-2">Save even more with Credex ✦</h3>
            <p className="text-white/60 mb-4 text-sm">Credex sells discounted AI credits — get the same tools for less.</p>
            <a href="https://credex.rocks" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105" style={{ background: "var(--accent)", color: "white" }}>Book a Credex Consultation</a>
          </div>
        )}

        {result.totalMonthlySavings === 0 && (
          <div className="card p-6 mb-6 text-center animate-slide-up" style={{ animationDelay: "0.2s", background: "var(--success-light)", border: "1px solid var(--success)" }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--success)" }}>You are spending well! ✓</h3>
            <p className="text-sm" style={{ color: "var(--success)" }}>Your current AI stack looks optimized. We will notify you when new savings apply.</p>
          </div>
        )}

        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <AuditSummary tools={audit.tools} useCase={audit.use_case} teamSize={audit.team_size} totalMonthlySavings={result.totalMonthlySavings} results={result.results} />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <EmailCapture auditId={id} monthlySavings={result.totalMonthlySavings} />
        </div>

        <div className="card p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Share your results</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Share this link — personal details are not included.</p>
          <ShareButton id={id} />
        </div>

        <Link href="/" className="block text-center text-sm transition-all hover:scale-105" style={{ color: "var(--text-muted)" }}>Run another audit</Link>

      </div>
    </main>
  )
}