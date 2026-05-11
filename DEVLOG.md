## Day 1 — 2026-05-07

**Hours worked:** 
3.15

**What I did:** 
Initialized Next.js project with Tailwind CSS and shadcn/ui. Set up Supabase project with audits and leads tables. Connected GitHub repo and deployed to Vercel. 
Researched and documented pricing for all 8 AI tools.

**What I learned:** 
Learned how to deploy a Next.js project on Vercel and connect it to a GitHub repo for automatic deployments on every push. 
Also researched and documented the pricing structures of all 8 AI tools and how API pricing works per million tokens.

**Blockers / what I'm stuck on:** 
None today, setup went smoothly.

**Plan for tomorrow:** 
Build the spend input form with tool selector, plan dropdowns, seats and monthly spend inputs. 
Add localStorage persistence for form state.

## Day 2 — 2026-05-08

**Hours Worked:**
1.15

**What I did:**
Built the spend input form with tool selector, plan dropdowns, seats and monthly spend inputs. 
Added localStorage persistence so form state survives page reloads. 
Added dynamic add/remove tool rows and basic form validation.

**What I learned:**
Learned how to use React useState and useEffect together to sync form data with localStorage. 
Also learned how to dynamically update dropdown options based on another dropdown's value.

**Blockers / what I'm stuck on:**
None today.

**Plan for tomorrow:**
Build the audit engine — the core logic that calculates savings for each tool based on plan, seats and use case.

## Day 3 — 2026-05-09

**Hours worked:** 
0

**What I did:** 
Nothing — was not at home today. 

**What I learned:** 
N/A

**Blockers / what I'm stuck on:** 
N/A

**Plan for tomorrow:** 
Build the audit engine with per-tool rules, write 5 unit tests covering the core logic, and build the results page that shows per-tool savings breakdown with total monthly and annual savings. Also create shareable unique URL for each audit.

## Day 4 — 2026-05-10

**Hours worked:**
5.45

**What I did:** 
Built the audit engine with 4 rules — wrong plan for team size, redundant coding tools, cheaper alternatives, and overspend detection. Wrote 5 passing unit tests. 
Built the results page showing per-tool savings breakdown, total monthly and annual savings, Credex CTA for high savers, and shareable unique URL. 
Fixed window is not defined error in ShareButton using useEffect.

**What I learned:** 
Learned that window object is not available during server side rendering in Next.js. Client components that use browser APIs must access them inside useEffect. Also learned how to write unit tests with Jest and ts-jest for TypeScript.

**Blockers / what I'm stuck on:** 
Window is not defined error in ShareButton — fixed by moving window access into useEffect.

**Plan for tomorrow:** 
Add email capture form on results page, store leads in Supabase, integrate Anthropic API for personalized audit summary, set up Resend for transactional emails.