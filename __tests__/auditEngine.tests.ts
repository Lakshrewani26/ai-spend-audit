import { runAudit } from "../lib/auditEngine"

// Test 1: Cursor Teams with 2 users should suggest downgrade to Pro
test("Cursor Teams with 2 seats should suggest downgrade to Pro", () => {
  const result = runAudit(
    [{ name: "Cursor", plan: "Teams", seats: 2, monthlySpend: 80 }],
    2,
    "Coding"
  )
  expect(result.results[0].recommendation).toBe("Downgrade to Pro")
  expect(result.results[0].savings).toBeGreaterThan(0)
})

// Test 2: GitHub Copilot Business with 1 user should suggest downgrade
test("GitHub Copilot Business with 1 seat should suggest downgrade to Individual", () => {
  const result = runAudit(
    [{ name: "GitHub Copilot", plan: "Business", seats: 1, monthlySpend: 19 }],
    1,
    "Coding"
  )
  expect(result.results[0].recommendation).toBe("Downgrade to Individual")
  expect(result.results[0].savings).toBe(9)
})

// Test 3: Cursor + GitHub Copilot together should flag Copilot as redundant
test("GitHub Copilot should be flagged as redundant when Cursor is present", () => {
  const result = runAudit(
    [
      { name: "Cursor", plan: "Pro", seats: 1, monthlySpend: 20 },
      { name: "GitHub Copilot", plan: "Individual", seats: 1, monthlySpend: 10 },
    ],
    1,
    "Coding"
  )
  const copilotResult = result.results.find(r => r.tool === "GitHub Copilot")
  expect(copilotResult?.savings).toBeGreaterThan(0)
})

// Test 4: Already optimal stack should have zero savings
test("Already optimal stack should return zero total savings", () => {
  const result = runAudit(
    [{ name: "Cursor", plan: "Pro", seats: 1, monthlySpend: 20 }],
    1,
    "Coding"
  )
  expect(result.totalMonthlySavings).toBe(0)
})

// Test 5: Total annual savings should be 12x monthly savings
test("Annual savings should be 12x monthly savings", () => {
  const result = runAudit(
    [{ name: "Cursor", plan: "Teams", seats: 2, monthlySpend: 80 }],
    2,
    "Coding"
  )
  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
})