# Contributing to FeedMeBack

Thanks for your interest in contributing! FeedMeBack is a small, young open-source project, and every contribution — bug reports, ideas, docs, or code — is welcome.

## Ways to contribute

- **Report bugs** — open an issue with clear steps to reproduce.
- **Suggest features** — open an issue describing the problem you want to solve.
- **Improve docs** — typos, unclear instructions, and missing explanations all count.
- **Submit code** — fix a bug or pick up an open issue.

If you're not sure where to start, look for issues labeled `good first issue`.

## Before you start

- Search [existing issues](https://github.com/dcelik81/feedmeback/issues) and pull requests to avoid duplicates.
- For anything larger than a small fix, please open an issue first so we can agree on the approach before you invest time.
- Be kind and respectful. We want this to be a welcoming space for everyone.

## Development setup

You'll need [Node.js](https://nodejs.org/), [pnpm](https://pnpm.io/), and a PostgreSQL database.

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/feedmeback.git
   cd feedmeback
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create your environment file and fill in the values:

   ```bash
   cp .env.example .env
   ```

4. Set up the database:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

Optional: run `pnpm db:studio` to inspect your data in Drizzle Studio.

### Project structure

```
feedmeback/
├── apps/
│   ├── api/        # Hono.js REST API
│   └── web/        # Vite + React + shadcn dashboard
├── packages/
│   └── db/         # Drizzle ORM schema, migrations, and database client
```

## Making changes

1. Sync your fork with `main` and create a new branch from it:

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feat/short-description
   ```

   Suggested branch prefixes: `feat/`, `fix/`, `docs/`, `chore/`.

2. Make your changes. Keep them focused — one pull request should do one thing.
3. Make sure the project still builds and runs locally, and that you haven't committed secrets or your `.env` file.
4. If you changed the database schema, include the generated migration files.
5. Update the README or other docs if your change affects them.

## Pull requests

- Open your PR against the `main` branch.
- Fill in a clear description: what changed, why, and how you tested it. Link the related issue (e.g. `Closes #12`).
- Keep PRs small and easy to review. Draft PRs are fine for early feedback.
- Be ready to respond to review comments. Push follow-up commits to the same branch.

### PR titles

This repository uses **squash merge only**: all commits in your PR are combined into a single commit on `main`, and the **PR title becomes the commit message**. Because of this, please write your PR title following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary in imperative mood>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

Examples:

- `feat: add upvote button to feedback cards`
- `fix: prevent duplicate votes from the same user`
- `docs: clarify database setup steps`

Your individual commit messages inside the branch don't need to follow a strict format.

### Branch protection

The `main` branch is protected. Direct pushes are not allowed — all changes go through a pull request and must be approved by a maintainer before merging.

## Reporting bugs

A good bug report includes:

- What you expected to happen and what actually happened
- Steps to reproduce the problem
- Your environment (OS, Node.js version, browser if relevant)
- Screenshots or logs if they help

## Security issues

Please **do not** open a public issue for security vulnerabilities. Instead, contact the maintainer privately through GitHub (e.g. via a [private security advisory](https://github.com/dcelik81/feedmeback/security/advisories/new)).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

