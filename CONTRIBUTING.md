# Contributing

Use Node.js 18+ and a separately installed, authenticated Antigravity CLI. There are no runtime npm dependencies.

```bash
git clone https://github.com/s1n3p1/gemtalk.git gemtalk
cd gemtalk
npm test
npm start
```

Keep conversations real. Fixtures can test parsing and migration, but do not substitute canned replies for the CLI in the product. Verify changes through the browser: member selection → room creation → actual model replies → pause/resume → persisted readback. Exercise both two-member and larger groups for orchestration changes.

Preserve existing room transcripts and CLI session handles across data-format changes. Never commit `data/`, `workspaces/`, credentials, or private diagnostics. Keep the loopback binding and same-origin mutation checks; public hosting requires a separate authentication layer.

Use relative asset/API URLs so root and prefixed deployments both work. Bump frontend URL versions after JS, CSS or manifest changes and verify the deployed browser loads the new assets. Respect reduced-motion preferences and verify light/dark/mobile layouts. At 1280×630 and 375×812, open a new-room dialog and confirm that its start button is fully inside the dialog before submitting; it must remain reachable without a backdrop click closing the form.

Default characters are original SVGs in `public/avatars.js`. Include proper attribution and licenses for any new third-party assets. Translations should preserve the unlimited-usage warning, measured usage values and installation commands.

Interface strings, suggested topics and default character profiles live in `public/i18n.js`. Cover every supported language; do not fall back to Korean. Check first-visit selection, settings and member forms in the browser, including Arabic right-to-left layout. Keep custom fields and historical messages intact when switching languages. Long translations must leave all dialog controls reachable by scrolling without a submit button covering other fields. README illustrations use the same conversation in all seven languages; preserve the original Korean wording and translate its meaning faithfully.

Open an issue with the behavior, reproduction steps and sanitized error details before a large architectural change. Contributions are accepted under the repository's MIT license.
