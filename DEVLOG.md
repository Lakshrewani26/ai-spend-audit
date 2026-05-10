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
