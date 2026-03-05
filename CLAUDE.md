# Trang Pham Cz Cosmetic - E-Commerce Website

## Project Overview
E-commerce cosmetics store for Vietnamese and Czech customers in Czech Republic.
- **Store Name**: Trang Pham Cosmetics
- **Markets**: Vietnamese (primary), Czech (secondary), English (tertiary)
- **Reference Design**: glowupdiary.com (layout, navigation, product cards)

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma ORM + PostgreSQL (production) / SQLite (dev)
- Deployed on Vercel
- GitHub: https://github.com/sangvk123/trang-pham-cz-cosmetic

## Team Skills (`.claude/skills/`)
| Role | Skill File | Responsibility |
|------|-----------|----------------|
| Frontend Dev | `nextjs-ecommerce-frontend.md` | UI components, responsive, i18n, state |
| Backend Dev | `backend-api.md` | API routes, auth, payment, orders |
| DBA | `database-admin.md` | Schema, migrations, queries, backups |
| QA Engineer | `quality-assurance.md` | Tests, accessibility, performance |
| Debug/Monitor | `debug-monitor.md` | Error tracking, logging, alerts |
| Security Engineer | `security-engineer.md` | OWASP, auth hardening, GDPR, CSP, audit |
| Product Manager | `product-manager.md` | Features, roadmap, UX decisions |
| Design (Official) | `frontend-design.md` | Visual design principles |
| Testing (Official) | `webapp-testing.md` | Playwright web testing |
| Artifacts (Official) | `web-artifacts-builder.md` | HTML artifact building |

## Key Conventions
- All user-facing text must support 3 languages: `vi`, `cs`, `en`
- Prices stored as integers in VND
- Product slugs for URLs (SEO-friendly)
- Mobile-first responsive design
- Brand color: sage green `#B5C4B1` (palette: sage-dark #8FA889, sage-darker #6B8F63)

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Current Phase: Phase 1 - MVP (Rebuild)
See `product-manager.md` for full roadmap.
