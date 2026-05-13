import AuditForm from "@/components/AuditForm"
import ThemeToggle from "@/components/ThemeToggle"
import Background from "@/components/Background"

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg-primary)" }}>
      <Background />
      <ThemeToggle />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10 animate-slide-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "var(--accent-light)",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
          >
            <span>✦</span>
            <span>Free AI Spend Auditor</span>
          </div>
          <h1
            className="text-5xl font-bold mb-4 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Are you overpaying for
            <span style={{ color: "var(--accent)" }}> AI tools?</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Find out in 2 minutes. Free audit shows exactly where your team is wasting money.
          </p>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <AuditForm />
        </div>
      </div>
    </main>
  )
}