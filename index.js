#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

/*
 * TAGS
 */
const TODO = "TODO";
const FIXME = "FIXME";

/*
 * PATTERNS
 */
const singleLineCommentPattern = new RegExp(
  /^\s*(?:\/\/|\{\s*\/\*)\s*(TODO|FIXME|NOTE):?\s*(.*?)\s*(?:\*\/)?\s*$/,
  "i"
);
const multilineCommentStart = new RegExp(/^\s*(\/\*|\{\s*\/\*|<!--)/);
const multilineCommentEnd = new RegExp(/(\*\/|-->)\s*}?$/);
const multilineTagLinePattern = new RegExp(
  /^\s*(?:\*|\/\*|<!--)?\s*(TODO|FIXME|NOTE):?\s*(.*?)\s*(?:\*\/|-->)?$/,
  "i"
);

async function scanComments(dir = ".") {
  // Get all files in the directory
  const entries = await fg(["**/*.{js,ts,jsx,tsx,html,css}"], {
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
          tag === TODO ? chalk.yellow : tag === FIXME ? chalk.red : chalk.white;

        console.log(`${color(`[${tag}]`)} ${file}:${lineNumber} → ${message}`);
      }

      if (inMultilineComment && multilineCommentEnd.test(line)) {
        inMultilineComment = false;
      }
    });
  }
}

scanComments();
