<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- antislop:start -->
## antislop
For UI, copy, accessibility, or mobile layout work, use antislop in **DURING** mode unless the user explicitly requests an **AFTER** audit.

Read the core first, followed by the skills relevant to the task:
- Core rules: `.agents/skills/antislop/SKILL.md`
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People / accessibility: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`

For UI work, read `DESIGN.md` first when it exists. Without explicit design direction, follow the core rule for a draft without direction rather than presenting the result as final design work. End completed UI work with the antislop Delivery Gate.
<!-- antislop:end -->
