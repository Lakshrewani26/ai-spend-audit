# Reflection

## 1. The Hardest Bug I Hit This Week

The hardest bug was the `window is not defined` error in the ShareButton component. When the results page loaded, the entire page crashed with a server-side rendering error because `window.location.origin` was being accessed during SSR (server-side rendering), where the `window` object doesn't exist.

My first hypothesis was that the component wasn't marked as a client component. I checked — it had `"use client"` at the top. That wasn't the issue.

My second hypothesis was that Next.js was still trying to pre-render the component on the server even with `"use client"`. I researched and found that in Next.js, even client components get an initial server render pass. So `window` is genuinely unavailable on first render.

What I tried: wrapping the window access in a `typeof window !== "undefined"` check. That stopped the crash but the URL showed as empty on first load.

What worked: moving the `window.location.origin` access inside a `useEffect` hook with `useState`. The effect only runs on the client after hydration, so `window` is always available. This is the correct pattern for accessing browser APIs in Next.js client components.

## 2. A Decision I Reversed Mid-Week

I initially planned to use the Anthropic API to power the audit engine itself — letting Claude analyze the tools and suggest savings. This seemed like a good idea because it would make the recommendations more intelligent and personalized.

I reversed this decision on Day 3 when I re-read the assignment brief carefully. It explicitly said: "For the audit math itself, hardcoded rules are correct — knowing when not to use AI is part of the test."

I realized that using AI for the audit logic would actually hurt my score, not help it. Hardcoded rules are more reliable, auditable, and defensible to a finance person. If Claude suggests "switch to Cursor" without showing the math, a CFO wouldn't trust it. But if the code says "Teams plan costs $40/user, Pro costs $20/user, you have 2 users, save $40/mo" — that's verifiable.

This was a good lesson: AI is not always the right tool. Sometimes deterministic logic is better.

## 3. What I Would Build in Week 2

**Priority 1 — Resend email integration**
Right now leads are captured but no email is actually sent. Week 2 would start with wiring up Resend to send a proper confirmation email with the full audit report as a PDF attachment.

**Priority 2 — PDF export**
The assignment listed PDF export as a bonus feature. A downloadable PDF of the audit report would make the tool feel more professional and shareable in a business context.

**Priority 3 — Benchmark mode**
"Your AI spend per developer is $X — companies your size average $Y." This would require collecting aggregate data from audits and showing percentile comparisons. This is the feature most likely to go viral because people love knowing how they compare to others.

**Priority 4 — More audit rules**
The current engine has 4 rule types covering 8 tools. Week 2 would expand the rules significantly — adding API usage optimization, annual vs monthly billing savings, and bundle deal detection.

## 4. How I Used AI Tools

**Tools used:** Claude (claude.ai) for code generation and architecture decisions.

**What I used it for:**
- Generating boilerplate component code (AuditForm, ShareButton)
- Debugging TypeScript errors
- Writing the audit engine rules structure
- Drafting documentation files

**What I didn't trust it with:**
- The actual pricing numbers — I verified every price myself on official vendor pages
- The audit logic reasoning — I reviewed every rule to make sure it was financially defensible
- The user interviews — those required real human conversations

**One specific time the AI was wrong:**
When I asked Claude to help fix the useEffect lint error, it suggested adding `// eslint-disable-line react-hooks/rules-of-hooks` as a comment. This was wrong — the actual rule being violated was `react-hooks/set-state-in-effect`, not `rules-of-hooks`. The comment silenced a different rule entirely and the CI still failed. I had to debug the actual eslint error myself and fix the root cause by using `setTimeout` instead of disabling the rule.

## 5. Self Rating

| Dimension | Rating | Reason |
|-----------|--------|--------|

| Discipline | 6/10 | Missed Day 3 completely due to being away from home. Made up the work but lost a day of consistency. |
| Code Quality | 7/10 | TypeScript throughout, clean component separation, audit engine is readable. Could improve error handling and add more tests. |
| Design Sense | 6/10 | Functional and clean but not visually impressive. Used Tailwind defaults without much custom design work. |
| Problem Solving | 8/10 | Debugged SSR issues, CI failures, and ESLint errors independently. Found root causes rather than just suppressing errors. |
| Entrepreneurial Thinking | 7/10 | Thought carefully about GTM, economics, and metrics. User interviews were the weakest part — only completed after the main build. |