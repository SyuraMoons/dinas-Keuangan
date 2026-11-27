# Rules for AI coding assistants

These rules apply to any AI assistant working in this repo (Claude Code, Cursor, Codex, …). Humans follow the same rules — see `README.md`.

## Git

- Never commit or push unless the user asks. Never push to `main` or `development`; work on `feat/*` / `fix/*` branches and PR into `development`.
- Commit messages: `type(scope): message`, lowercase, imperative. Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`, `ci`, `build`, `revert`. Example: `feat(pbb): add capaian per kalurahan`.
- No AI attribution anywhere: no `Co-Authored-By: Claude`/AI trailers, no "Generated with …" lines in commits or PR descriptions. CI rejects them.
- Never commit `.env`, `docs/reference/`, or real data files from BKAD (Excel exports, dumps).

## Architecture

- Controllers stay thin: validate (Form Request), call a Service in `app/Services/<Module>/`, return `Inertia::render(...)`.
- Every query on regional data applies the user's scope (hierarchical code prefix). Never rely on hiding menus. Out of scope → 403.
- Dashboard reads only the **active** import batch.
- Total aset kabupaten comes from the OPD-00 row, never from summing rows.
- Catatan is one-way (Pimpinan → recipients), no replies; store a snapshot of the numbers.
- Money is `DECIMAL(20,2)` in the database. Format only in the frontend, with one shared helper in `resources/js/lib/`.
- Never edit a migration that is already merged into `development`; add a new one.

## Frontend

- One folder per menu in `resources/js/pages/`. Page-only components stay in that folder; move to `components/dashboard/` only when 2+ pages use it.
- Use generated Wayfinder routes (`@/routes`), not hard-coded URLs.
- UI text in Bahasa Indonesia; code, identifiers and comments in English.
- Define colors as design tokens in `resources/css/app.css`; no hard-coded hex colors in components.

## Shared files — don't change without saying so in the PR

`resources/js/layouts/`, `resources/js/components/`, `resources/js/lib/`, `resources/css/app.css`, `routes/web.php`, `.github/`.

## Before calling a task done

- Add or update a Pest test for the behavior you changed.
- Run `composer ci:check` (format, types, Pint, PHPStan, tests). Fix formatting with `pnpm run check:fix` and `composer lint`.
- Don't add dependencies (composer or pnpm) without the user agreeing.
