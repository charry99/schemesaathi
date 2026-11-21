# SchemeSaathi

Find government schemes you may be eligible for — in plain language, in English or Telugu.

SchemeSaathi helps low-income students in Andhra Pradesh find education schemes they qualify for. Instead of a long form, it asks a few guided questions (or takes a plain-language description), then matches the answers against scheme rules stored as editable data.

For every result it shows its reasoning:

- **Likely eligible** schemes, with a plain-language reason for every rule that matched
- **Almost eligible** schemes, naming the one rule that is missing
- A merged, tickable **document checklist** across all matched schemes
- **Step-by-step apply guides** with the official portal link and a "Last verified" date for every scheme
- **Application tracking and deadline reminders**, stored locally in the browser

It says "likely eligible", never "guaranteed", and it never collects Aadhaar or other sensitive ID numbers. Sample profiles are included so anyone can try it without entering real details.

## Problem statement

Built for ACE BUILDERS 2026, Problem Statement 5 (Citizens & Public Services): a plain-language scheme eligibility matcher for one specific group in one state — low-income students in Andhra Pradesh.

## Run it

It is a static site with no build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```
python -m http.server
```

Then visit http://localhost:8000/.

## Layout

- `index.html`, `styles.css` — the page and its styling
- `data/schemes.js` — the scheme dataset (8 schemes). Rules, documents and apply steps are plain editable data, in English and Telugu
- `js/matcher.js` — the eligibility matching engine (rule checks with reasons)
- `js/i18n.js` — English / Telugu language strings
- `js/app.js` — rendering and interaction
- `tests/check-matcher.js` — matcher checks for the three sample profiles (`node tests/check-matcher.js`)

## Schemes in the demo dataset

Post Matric Scholarship (AP, via Jnanabhumi), Jagananna Vidya Deevena, Jagananna Vasathi Deevena, Amma Vodi, Central Sector Scholarship (NSP), Post Matric Scholarship for SC Students (NSP), Merit-cum-Means Scholarship for Minority Students (NSP), Prime Minister's Scholarship Scheme.

Demo dataset for illustration. Always confirm eligibility and deadlines on the official portal before applying.

## Built with

Built using Codebenders (Nexen IDE) for the ACE BUILDERS 2026 hackathon.

## License

MIT
