# remind-me-later

[![npm version](https://img.shields.io/npm/v/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![Node.js Version](https://img.shields.io/node/v/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![npm weekly downloads](https://img.shields.io/npm/dw/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![npm monthly downloads](https://img.shields.io/npm/dm/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![npm total downloads](https://img.shields.io/npm/dt/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![License](https://img.shields.io/npm/l/remind-me-later.svg)](https://github.com/bendiep/remind-me-later/blob/main/LICENSE)

A simple command-line tool to scan your codebase for `TODO` and `FIXME` comments — perfect for tracking unfinished tasks.

## 🔍 What It Does

- Scans your project files for comments tagged with `TODO` and `FIXME`
- Detects both `single-line` and `multi-line` comments
- Outputs matches neatly to your terminal, including:
  - `filename`
  - `line number`
  - `comment preview`
- Displays a final summary with the total number of matches found
- Supports the following file types:
  - `.js`
  - `.ts`
  - `.jsx`
  - `.tsx`
  - `.html`
  - `.css`

---

## 📦 Installation

Run directly without installing:

```bash
npx remind-me-later
```

Or install locally as a dev dependency:

```bash
npm install remind-me-later --save-dev
```

Then, add a script to your package.json.

**Recommended**: Integrate with your existing dev script like this:

```json
"scripts": {
  "dev": "remind-me-later && <existing_dev_command>",
  "remind-me-later": "remind-me-later"
}
```

## ▶️ Usage

Run manually:

```bash
npm run remind-me-later
```

Or integrated with your dev workflow:

```bash
npm run dev
```

## 📂 Example Output

```text
[TODO] src/index.ts:100 → TODO: Clean up this logic
[FIXME] src/utils/helpers.js:50 → FIXME: This fails when empty

🟡 Found 2 comments marked with TODO/FIXME (TODO: 1, FIXME: 1)
💬 Don't forget to come back to them!
```

## 📝 License

Released under the MIT License. Feel free to use, modify, and share!
