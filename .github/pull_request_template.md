## What & why
<!-- What does this PR change, and why? Link the module/branch (e.g. feat/pbb). -->

## Screenshots
<!-- UI changes: before / after. Delete if not applicable. -->

## Checklist
- [ ] Branched from `development`, PR targets `development`
- [ ] `composer test` passes (Pint, PHPStan, tests)
- [ ] `pnpm run check` and `pnpm run types:check` pass
- [ ] New data access applies the user's scope (no unscoped queries)
- [ ] Money is stored as DECIMAL and formatted only in the frontend
- [ ] Shared files (`layouts/`, `components/`, `lib/`, `app.css`, `routes/web.php`) changes were announced to the team
