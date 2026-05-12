# Prompts

## AI Summary Prompt

### The Prompt
You are an AI spend analyst. Write a 100-word personalized summary for a team audit.
Team details:

Team size: {teamSize} people
Primary use case: {useCase}
Tools audited: {tools}
Total potential savings: ${totalMonthlySavings}/month
Findings: {toolSummary}

Write a friendly, specific, actionable 100-word summary. Be direct and mention specific tools and savings amounts. Do not use bullet points.

### Why I wrote it this way
- Giving the model a clear role ("AI spend analyst") improves response quality
- Providing specific numbers forces the model to be concrete not generic
- "Do not use bullet points" ensures flowing paragraph format
- Keeping it to 100 words ensures it's readable and not overwhelming

### What I tried that didn't work
- First version had no role definition — responses were too generic
- Second version asked for 200 words — too long for a results page
- Third version didn't specify "no bullet points" — model kept using lists

### Fallback
When the API fails or has no credits, a templated fallback is used:
- If savings > 0: mentions specific savings amount and use case
- If savings = 0: congratulates the user on optimal spending