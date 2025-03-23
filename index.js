#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

// This regex matches only lines that start with a comment containing
const pattern = /\/\/\s*(TODO|FIXME|NOTE):?.*/i;

async function scanComments(dir = ".") {
  // Search for .js, .ts, .jsx, and .tsx files, ignoring node_modules
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
        const tag = match[1].toUpperCase(); // captures the tag (TODO, FIXME, NOTE)
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
