# AI Spend Audit

AI Spend Audit is a free tool for startup founders and engineering managers to find out exactly where they're overspending on AI tools like Cursor, Claude, ChatGPT, and GitHub Copilot — and get an instant, shareable report with real savings numbers. It acts as a lead-generation asset for [Credex](https://credex.rocks), surfacing overspend and connecting high-savings users to discounted AI infrastructure credits.

## Screenshots

### 1. Spend Input Form
![Spend Input Form](./screenshots/form_light.png)
![Spend Input Form](./screenshots/form_dark.png)

> Cold visitors enter their AI tools, plans, seats, and monthly spend — no login required.

### 2. Audit Results Page
![Audit Results Page](./screenshots/result_light.png)
![Audit Results Page](./screenshots/result_dark.png)

> Instant on-screen audit: per-tool breakdown, total monthly + annual savings hero, AI-generated personalized summary, email capture, and a shareable public URL.

## Quick Start

### Prerequisites
- Node.js 18+
- A Supabase project (for lead storage)
- An Anthropic API key (for AI summaries)

### Install & Run Locally

```bash
git clone https://github.com/your-username/ai-spend-audit.git
cd ai-spend-audit
npm install
cp .env.local.example .env.local
# Fill in your keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Run Tests

```bash
npm test
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## Decisions

### 1. Hardcoded rules for the audit engine instead of AI
The audit math uses deterministic, rule-based logic — not an LLM. A finance person needs to read the reasoning and agree with it. LLMs can hallucinate savings numbers, which would destroy trust in a tool whose entire value prop is accurate numbers. AI is used only for the personalized summary paragraph, where a wrong word doesn't break the product.

### 2. Supabase over Firebase
Supabase gives a proper relational database (Postgres), which makes querying leads by savings tier, tool stack, and submission date straightforward with SQL. Firebase's document model would make those analytics queries unnecessarily complex. Supabase also has a generous free tier and a familiar REST/SDK interface.

### 3. No login required — email captured after value is shown
Requiring login before showing the audit would kill conversion. The trade-off is users can't retrieve past audits without their email, but for a lead-gen tool this is the right call: show value first, capture the lead second.

### 4. Next.js App Router over Pages Router
App Router enables per-route React Server Components, which means the shareable `audit/[id]` page generates Open Graph meta tags server-side without an extra API round-trip. The trade-off is a steeper learning curve and occasional library compatibility issues, but the SEO and sharing benefits are worth it for a tool designed to be screenshot and shared.

### 5. AI summary as enhancement, not core — with graceful fallback
The Anthropic API call for the personalized summary is non-blocking. If the API is unavailable, rate-limited, or returns an error, the audit falls back to a templated summary automatically. The full audit result — savings numbers, per-tool breakdown, email capture — works regardless. The trade-off is the fallback feels less personalized, but a broken page would be far worse.

## Live URL

🔗 [https://ai-spend-audit-kappa.vercel.app/](https://ai-spend-audit-kappa.vercel.app/)