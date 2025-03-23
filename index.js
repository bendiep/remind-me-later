#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

// Combined regex to match both JS and JSX comments containing TODO, FIXME, or NOTE.
// - For JS comments: matches lines starting with "//" followed by the tag.
// - For JSX comments: matches "{/*" then the tag and ends with "*/}".
const pattern =
  /(?:\/\/\s*(TODO|FIXME|NOTE):?.*)|(?:\{\/\*\s*(TODO|FIXME|NOTE):?.*\*\/\})/i;

async function scanComments(dir = ".") {
  // Search for .js, .ts, .jsx, and .tsx files, excluding node_modules
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

        console.log(
          `${color(`[${tag}]`)} ${file}:${index + 1} → ${line.trim()}`
        );
      }
    });
  }
}

scanComments();
