# remind-me-later

A simple CLI tool that scans your codebase for developer comments like `TODO`, `FIXME`, and `NOTE`, so you don’t forget to address them later.

_Perfect for those "I'll come back to this" moments. Let your code remind you._

---

## ✨ What It Does

- Scans files in your project for:
  - `// TODO:`
  - `// FIXME:`
  - `// NOTE:`
- Logs them to your terminal with file name and line number
- Works with `.js`, `.ts`, `.jsx`, `.tsx` files

---

## 📦 Installation

Install package

```bash
npm install remind-me-later --save-dev
```

Add this to your package.json scripts:

```js
"scripts": {
  "reminders": "remind-me-later"
}
```

## 🏃‍♂️ Usage

Run script

```bash
npm run reminders
```

## 📂 Example Output

```text
[TODO] src/index.ts:100 → // TODO: clean up this logic
[FIXME] src/utils/helpers.js:50 → // FIXME: this fails when empty
[NOTE] src/api/user.js:150 → // NOTE: quick hack for now, revisit later
```

## 🤔 How it Works

Under the hood, remind-me-later uses a simple regex pattern to find comment markers in your code:

It recursively scans your project directory, focusing on JavaScript and TypeScript files by default.

## 📝 License

MIT — use it freely, fix your own code later 😅
