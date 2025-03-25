# remind-me-later

A simple CLI tool to scan your codebase for `TODO` and `FIXME` comments — perfect for tracking unfinished tasks.

## ✨ What It Does

- Scans your project files for comments tagged: `TODO` and `FIXME`
- Logs matches neatly to your terminal, including filename and line number
- Supports `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css` files

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
```

## 📝 License

Released under the MIT License. Feel free to use, modify, and share!
