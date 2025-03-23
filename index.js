#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

// Individual regex patterns
const todoTags = "(TODO|FIXME|NOTE)";
const jsCommentPattern = `\/\/\\s*${todoTags}:?.*`;
const jsxCommentPattern = `\\{\\/\\*\\s*${todoTags}:?.*\\*\\/\\}`;

// Combined regex pattern
const pattern = new RegExp(
  `(?:${jsCommentPattern})|(?:${jsxCommentPattern})`,
  "i"
);

async function scanComments(dir = ".") {
  /*
   * Files to scan: *.js, *.ts, *.jsx, *.tsx
   * Files to ignore: node_modules
   */
  const entries = await fg(["**/*.{js,ts,jsx,tsx}"], {
    cwd: dir,
    ignore: ["node_modules"],
  });

  for (const file of entries) {
    const content = await fs.readFile(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      const match = line.match(pattern);
      if (match) {
        // If it's a JS comment, the tag is in group 1; for JSX, it's in group 2.
        const tag = (match[1] || match[2]).toUpperCase();
        const color =
          tag === "TODO"
            ? chalk.blue
            : tag === "FIXME"
            ? chalk.red
            : chalk.yellow;

        // Print the tag, file, line number, and the comment itself.
        console.log(
          `${color(`[${tag}]`)} ${file}:${index + 1} → ${line.trim()}`
        );
      }
    });
  }
}

scanComments();
