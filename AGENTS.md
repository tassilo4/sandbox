# Project purpose

This is a public gallery of UI components, graphics effects, and interaction
experiments. Each experiment typically lives on its own route (for example,
`app/codex-bg` or `app/ascii-wave`) and should remain understandable in isolation.

Keep the gallery safe to deploy as a static public showcase. Avoid unauthenticated
mutation endpoints, arbitrary server-side URL fetching, or dependencies on private
services. New experiments should include a descriptive entry on the home page.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:cicada-toolkit-rules -->
# Preinstalled component toolkit

This project deliberately ships no styled component library — build UI in whatever
direction the user wants. The headless plumbing is already installed; use it instead
of adding component or icon libraries:

- **Interactive components:** compose from `@base-ui/react` primitives
  (Dialog, Menu, Select, Popover, Tooltip, …) and style them with Tailwind classes.
  Base UI renders unstyled by design — all styling is yours.
- **Class composition:** `cn()` from `@/lib/utils` (clsx + tailwind-merge).
- **Icons:** `HugeiconsIcon` from `@hugeicons/react` with icons imported from
  `@hugeicons/core-free-icons`, e.g.
  `<HugeiconsIcon icon={Search01Icon} size={16} color="currentColor" />`.

Do not install other component or icon libraries unless the user explicitly asks.
<!-- END:cicada-toolkit-rules -->
