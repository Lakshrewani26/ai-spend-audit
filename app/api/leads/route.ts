import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { auditId, email, company, role } = await req.json()

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Save lead to Supabase
    const { error } = await supabase.from("leads").insert({
      audit_id: auditId,
      email,
      company: company || null,
      role: role || null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}