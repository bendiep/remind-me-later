#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

const todoTags = "(TODO|FIXME|NOTE)";

// Matches single-line comments (JS or JSX)
const singleLineCommentPattern =
  /^\s*(?:\/\/|{\s*\/\*)\s*(TODO|FIXME|NOTE):?\s*(.*?)\s*(?:\*\/)?\s*$/i;

// Matches start/end of multi-line comment blocks
const multilineCommentStart = /^\s*(\/\*|{\s*\/\*)/;
const multilineCommentEnd = /\*\/\s*}?$/;

// Matches individual lines inside multiline comments with tags
const multilineTagLinePattern = /^\s*\*?\s*(TODO|FIXME|NOTE):?\s*(.*)$/i;

async function scanComments(dir = ".") {
  const entries = await fg(["**/*.{js,ts,jsx,tsx}"], {
    cwd: dir,
    ignore: ["node_modules"],
  });

  for (const file of entries) {
    const content = await fs.readFile(file, "utf8");
    const lines = content.split("\n");

    let inMultilineComment = false;

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      if (multilineCommentStart.test(line)) {
        inMultilineComment = true;
      }

      let match = line.match(singleLineCommentPattern);

      if (!match && inMultilineComment) {
        match = line.match(multilineTagLinePattern);
      }

      if (match) {
        const tag = match[1].toUpperCase();
        const message = match[2].trim();

        const color =
          tag === "TODO"
            ? chalk.blue
            : tag === "FIXME"
            ? chalk.red
            : chalk.yellow;

        console.log(`${color(`[${tag}]`)} ${file}:${lineNumber} → ${message}`);
      }

      if (inMultilineComment && multilineCommentEnd.test(line)) {
        inMultilineComment = false;
      }
    });
  }
}

scanComments();
