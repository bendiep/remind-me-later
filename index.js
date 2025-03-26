#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

/*
 * SUPPORTED TAGS:
 * These are the tags that will be recognized in comments
 */
const TODO = "TODO";
const FIXME = "FIXME";
const tagPattern = `(${TODO}|${FIXME})`;

/*
 * FILE PATTERNS to INCLUDE and IGNORE:
 */
const INCLUDE_PATTERNS = ["**/*.{js,ts,jsx,tsx,html,css}"];
const IGNORE_PATTERNS = ["node_modules"];

/*
 * Regular expressions for matching comment patterns.
 */
const singleLineCommentPattern = new RegExp(
  `^\\s*(?://|\\{\\s*/\\*)\\s*(${tagPattern}):?\\s*(.*?)\\s*(?:\\*/)?\\s*$`,
  "i"
);
const multilineCommentStart = new RegExp(/^\s*(\/\*|\{\s*\/\*|<!--)/);
const multilineCommentEnd = new RegExp(/(\*\/|-->)\s*}?$/);
const multilineTagLinePattern = new RegExp(
  `^\\s*(?:\\*|\\/\\*|<!--)?\\s*(${tagPattern}):?\\s*(.*?)\\s*(?:\\*\\/|-->)?$`,
  "i"
);

export async function scanComments(dir = ".") {
  // Get all matching files from the directory (excluding node_modules)
  const entries = await fg(INCLUDE_PATTERNS, {
    cwd: dir,
    ignore: IGNORE_PATTERNS,
  });

  let totalFoundTags = 0;

  // Iterate through each file in the directory
  for (const file of entries) {
    const content = await fs.readFile(file, "utf8");
    const lines = content.split("\n");
    let inMultilineComment = false;

    // Loop through each line of the file to find tags
    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check if a multiline comment starts on this line
      if (multilineCommentStart.test(line)) {
        inMultilineComment = true;
      }

      // Try to match single line comment pattern first
      // If in a multiline comment, try to match tag pattern within comment
      let match = line.match(singleLineCommentPattern);
      if (!match && inMultilineComment) {
        match = line.match(multilineTagLinePattern);
      }

      // Print matched comment
      if (match) {
        totalFoundTags++;
        const tag = match[1].toUpperCase();
        const message = match[2].trim();
        const color =
          tag === TODO ? chalk.yellow : tag === FIXME ? chalk.red : chalk.white;
        console.log(`${color(`[${tag}]`)} ${file}:${lineNumber} → ${message}`);
      }

      // Check if a multiline comment ends on this line
      if (inMultilineComment && multilineCommentEnd.test(line)) {
        inMultilineComment = false;
      }
    });
  }

  return totalFoundTags;
}

scanComments().then((total) => {
  const plural = total !== 1;

  if (total === 0) {
    console.log(
      chalk.greenBright(
        "\n✅ No TODO/FIXME comments found! Your codebase is squeaky clean 🧼\n"
      )
    );
  } else {
    console.log(
      chalk.yellowBright(
        `\n⚠️  Found ${total} comment${
          plural ? "s" : ""
        } marked with TODO/FIXME. Don't forget to come back to ${
          plural ? "them" : "it"
        }! 💬\n`
      )
    );
  }
});
