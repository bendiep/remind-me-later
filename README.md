# remind-me-later

[![npm version](https://img.shields.io/npm/v/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![npm weekly downloads](https://img.shields.io/npm/dw/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![npm total downloads](https://img.shields.io/npm/dt/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![Node.js Version](https://img.shields.io/node/v/remind-me-later.svg)](https://www.npmjs.com/package/remind-me-later)
[![License](https://img.shields.io/npm/l/remind-me-later.svg)](https://github.com/bendiep/remind-me-later/blob/main/LICENSE)

A simple CLI tool to scan your codebase for `TODO` and `FIXME` comments — perfect for tracking unfinished tasks.

## 🔍 What It Does

- Scans your project files for comments tagged: `TODO` and `FIXME`
- Logs matches neatly to your terminal, including filename and line number
- Supports `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css` files

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
  "remind-me-later": "remind-me-later",
  "dev": "remind-me-later && <existing_dev_command>"
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
[TODO] src/index.ts:100 → // TODO: Clean up this logic
[FIXME] src/utils/helpers.js:50 → // FIXME: This fails when empty
```

## 📝 License

Released under the MIT License. Feel free to use, modify, and share!
