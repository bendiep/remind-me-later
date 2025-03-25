import { describe, it, expect } from "vitest";
import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";

const todoTags = "(TODO|FIXME|NOTE)";
const pattern = new RegExp(
  `(?:\\/\\/\\s*${todoTags}:?.*)|(?:\\{\\/\\*\\s*${todoTags}:?.*?\\*\\/\\})|(?:\\/\\*[\\s\\S]*?(?:${todoTags}:?[\\s\\S]*?)\\*\\/)|(?:\\{\\s*\\/\\*[\\s\\S]*?(?:${todoTags}:?[\\s\\S]*?)\\*\\/\\s*\\})`,
  "i"
);

describe("remind-me-later real-file tests", () => {
  it("finds comments in example files", async () => {
    const files = await fg(["tests/examples/**/*.{js,jsx,ts,tsx}"]);

    expect(files.length).toBeGreaterThan(0); // Make sure example files exist

    for (const file of files) {
      const content = await fs.readFile(file, "utf8");
      const matches = content.match(pattern);

      expect(matches, `No matches in ${file}`).not.toBeNull();

      // Optional: Log match for debugging
      if (matches) {
        console.log(`Matched in ${file}:`, matches[0].trim());
      }
    }
  });
});
