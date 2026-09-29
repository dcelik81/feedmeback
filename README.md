<h1 align="center">FeedMeBack</h1>

This is a monorepo for "FeedMeBack" project, a feedback, feature request, comments, votes and more platform for developers, designers and more.

## Techstack

- pnpm
- Vite + React + TS
- Tailwind + Shadcn
- Hono.js
- Drizzle ORM
- Postgresql

## Development

Fork the project.

```bash
git clone https://github.com/username/feedmeback.git
cd feedmeback

pnpm i

cp .env.example .env

# Push schema to database
pnpm db:generate
pnpm db:migrate

# Optional: Open Drizzle Studio to inspect data visually
pnpm db:studio

pnpm dev
```

## File Structure

```text
feedmeback/
├── apps/
│   ├── api/        # Hono.js REST API
│   └── web/        # Vite + React + shadcn dashboard
├── packages/
│   └── db/         # Drizzle ORM schema, migrations, and database client
├── package.json    # Root scripts and workspace settings
└── pnpm-workspace.yaml
```

