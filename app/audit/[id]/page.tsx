import { createClient } from "@supabase/supabase-js"
import { runAudit } from "@/lib/auditEngine"
import { notFound } from "next/navigation"
import ShareButton from "@/components/ShareButton"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-xl shadow p-8 mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ${result.totalMonthlySavings.toFixed(0)}/mo
          </h1>
          <p className="text-gray-500 text-lg">potential monthly savings</p>
          <p className="text-2xl font-semibold text-green-600 mt-2">
            ${result.totalAnnualSavings.toFixed(0)} saved per year
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tool by Tool Breakdown
          </h2>
          {result.results.map((r, i) => (
            <div key={i} className="border-b last:border-0 py-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium text-gray-800">{r.tool}</span>
                  <span className="text-sm text-gray-500 ml-2">{r.plan}</span>
                </div>
                {r.savings > 0 ? (
                  <span className="text-green-600 font-semibold">
                    Save ${r.savings.toFixed(0)}/mo
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">Optimal</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{r.reason}</p>
              {r.savings > 0 && (
                <p className="text-sm font-medium text-blue-600 mt-1">
                  {r.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>

        {result.totalMonthlySavings > 500 && (
          <div className="bg-black text-white rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">
              You could save even more with Credex
            </h3>
            <p className="text-gray-300 mb-4">
              Credex sells discounted AI credits — get the same tools for less.
            </p>
            <a href="https://credex.rocks" className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 inline-block">Book a Credex Consultation</a>
          </div>
        )}

        {result.totalMonthlySavings === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              You are spending well!
            </h3>
            <p className="text-green-700">
              Your current AI stack looks optimized. We will notify you when new savings apply.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Share your results
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Share this link — personal details are not included.
          </p>
          <ShareButton id={id} />
        </div>

        <a href="/" className="block text-center text-gray-500 hover:text-gray-700 text-sm">Run another audit</a>

      </div>
    </main>
  )
}