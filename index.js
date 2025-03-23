#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs/promises";
import chalk from "chalk";

const tags = ["TODO", "FIXME", "NOTE"];

async function scanComments(dir = ".") {
  const entries = await fg(["**/*.{js,ts,jsx,tsx}"], {
    cwd: dir,
    ignore: ["node_modules"],
  });

  for (const file of entries) {
    const content = await fs.readFile(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      for (const tag of tags) {
        if (line.includes(tag)) {
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
      }
    });
  }
}

scanComments();
