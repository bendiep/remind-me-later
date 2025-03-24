#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

// Define the tag group once.
const todoTags = "(TODO|FIXME|NOTE)";

// Single-line JS comments
const jsSingleCommentPattern = `\\/\\/\\s*${todoTags}:?.*`;

// Single-line JSX comments (e.g., {/* NOTE: ... */})
const jsxSingleCommentPattern = `\\{\\/\\*\\s*${todoTags}:?.*?\\*\\/\\}`;

// JS Multiline comments (/* ... */)
const jsMultiLineCommentPattern = `\\/\\*[\\s\\S]*?\\b${todoTags}\\b:.*?\\*\\/`;

// JSX Multiline comments ({/* ... */})
const jsxMultiLineCommentPattern = `\\{\\/\\*[\\s\\S]*?\\b${todoTags}\\b:.*?\\*\\/\\}`;

const combinedPattern = new RegExp(
  [
    jsSingleCommentPattern,
    jsxSingleCommentPattern,
    jsMultiLineCommentPattern,
    jsxMultiLineCommentPattern,
  ].join("|"),
  "gim"
);

async function scanComments(dir = ".") {
  const entries = await fg(["**/*.{js,ts,jsx,tsx}"], {
    cwd: dir,
    ignore: ["node_modules"],
  });

  for (const file of entries) {
    const content = await fs.readFile(file, "utf8");

    // Match comments globally in the file
    const matches = content.matchAll(combinedPattern);

    for (const match of matches) {
      // Determine matched tag (first capturing group)
      const tag = match[1]?.toUpperCase() || "UNKNOWN";
      const color =
        tag === "TODO"
          ? chalk.blue
          : tag === "FIXME"
          ? chalk.red
          : tag === "NOTE"
          ? chalk.yellow
          : chalk.white;

      // Determine line number by counting newlines before the match
      const lineNumber = content.substring(0, match.index).split("\n").length;

      // Extract matched comment text and clean it up
      const commentText = match[0].replace(/^\s+|\s+$/g, "");

      // Print the result
      console.log(
        `${color(`[${tag}]`)} ${file}:${lineNumber} → ${commentText}`
      );
    }
  }
}

scanComments();
