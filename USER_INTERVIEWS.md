# User Interviews

## Interview 1 — Preet, Computer Science and Engineering Student, Early-stage Freelancer

**Date:** 2026-05-13
**Duration:** ~9 minutes

**Notes:**
Preet is a 2nd-year engineering student who also does small freelance web development projects. He uses AI mostly for coding help, assignments, and productivity.

**Q: Which AI tools do you use regularly?**
A: Mostly ChatGPT every day. I also use GitHub Copilot sometimes while coding. Oh, and Grammarly too… I forgot that counts as AI. For presentations I use Canva AI features occasionally.

**Q: Do you know what you spend on them monthly?**
A: Umm… I think around ₹1,000–₹1,500 monthly. Actually wait, Copilot is free with my student account right now, so maybe less than that.

**Q: Have you ever felt like you were overpaying or underusing a plan?**
A: Yeah definitely. During exams I bought ChatGPT Plus because everyone recommended it, but after exams I barely opened it for weeks. It felt like I was paying for something I wasn’t really using.

**Q: Have you ever switched tools to save money?**
A: Yes. I stopped paying for a writing tool because ChatGPT could already do most of the same work. I just use the free Grammarly version now.

**Q: What would make you trust a tool that audits your AI spend?**
A: I’d trust it if it clearly explained where my money is going and didn’t ask for unnecessary permissions. Also if it could suggest cheaper alternatives, that would be really useful.

**Direct quotes:**

* “I subscribed because everyone else was using it.”
* “Sometimes I forget I even have active subscriptions.”
* “If two tools are doing the same thing, I’d rather keep only one.”

**Most surprising thing they said:**
They often forget which subscriptions are active because payments are automated.

**What it changed about my design:**
Added a note on the results page reminding users to cancel unused subscriptions, 
and made the "you're spending well" message more specific about which tools 
are optimally used vs just inactive.

## Interview 2 — Dolly, Freelance Designer & Content Creator, Solo Business

**Date:** 2026-05-13
**Duration:** ~15 minutes

**Notes:**
Dolly works independently and uses AI tools heavily for content creation, image editing, and client communication. She pays for multiple subscriptions herself.

**Q: Which AI tools do you use regularly?**
A: Claude almost daily, Canva AI, and sometimes Midjourney for creative ideas. I also use Notion AI a bit for organizing content. Umm… yeah that’s mostly it.

**Q: Do you know what you spend on them monthly?**
A: Not exactly. I know it’s probably more than I should be spending. Maybe around ₹4,000–₹6,000 total every month.

**Q: Have you ever felt like you were overpaying or underusing a plan?**
A: Yes, especially with image generation tools. There are months where I use them constantly and other months where I barely touch them, but the subscription still renews.

**Q: Have you ever switched tools to save money?**
A: Yeah, I moved from one premium design AI tool to Canva because Canva already included a lot of features I needed. It just made more sense financially.

**Q: What would make you trust a tool that audits your AI spend?**
A: Transparency. I’d want it to show exactly what I’m paying for and how often I’m using each tool. Also privacy is important because some client work is confidential.

**Direct quotes:**

* “I think I pay for convenience more than actual usage sometimes.”
* “Some subscriptions just quietly renew in the background.”
* “If a dashboard could show what I’m wasting money on, I’d use it.”

**Most surprising thing they said:**
They continue paying for tools mainly because canceling and re-subscribing later feels inconvenient.

**What it changed about my design:**
Reinforced the decision to never ask for account access or permissions — 
the audit is purely input-based. Also made privacy messaging more explicit 
on the form ("we never access your accounts, only what you tell us").

## Interview 3 — Aman, Startup Operations Associate, Small Team

**Date:** 2026-05-13
**Duration:** ~12 minutes

**Notes:**
Aman works in operations at a small startup where the team experiments with multiple AI productivity tools. He manages some of the team subscriptions.

**Q: Which AI tools do you use regularly?**
A: ChatGPT, Claude occasionally, and Perplexity for research. The company also uses Notion AI and Cursor for dev team. 

**Q: Do you know what you spend on them monthly?**
A: Personally not much, but the company probably spends around ₹10k–₹15k monthly combined.

**Q: Have you ever felt like you were overpaying or underusing a plan?**
A: Definitely. We bought team plans thinking everyone would use them daily, but only a few people actually did. Some seats were basically unused.

**Q: Have you ever switched tools to save money?**
A: Yeah, we replaced one AI writing platform because ChatGPT already covered most of our needs. Paying for both didn’t really make sense.

**Q: What would make you trust a tool that audits your AI spend?**
A: It should connect securely and give actionable suggestions instead of just charts. Like tell me which subscriptions are underused and which plans we can downgrade.

**Direct quotes:**

* “We realized half the team never even logged in.”
* “Sometimes tools overlap more than companies admit.”
* “Analytics are nice, but I need actual recommendations.”

**Most surprising thing they said:**
The company continued paying for unused team seats simply because nobody was actively monitoring them.

**What it changed about my design:**
Strengthened the per-seat logic in the audit engine — if seats > active users 
is a pattern, the tool should flag unused seats as a savings opportunity 
more prominently, not just wrong plan size.

