import AuditForm from "@/components/AuditForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        AI Spend Audit
      </h1>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Find out how much your team is overspending on AI tools
      </p>
      <AuditForm />
    </main>
  )
}