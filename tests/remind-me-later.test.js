import { describe, it, expect } from "vitest";
import fg from "fast-glob";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import {
  singleLineCommentPattern,
  multilineCommentStart,
  multilineCommentEnd,
  multilineTagLinePattern,
} from "../index.js";

describe("remind-me-later real-file tests", () => {
  it("correctly identifies TODO and FIXME comments in example files", async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const exampleDir = path.resolve(__dirname, "./examples");
    const files = await fg(["**/*.{js,ts,jsx,tsx,html,css}"], {
      cwd: exampleDir,
    });

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const filePath = path.join(exampleDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const lines = content.split("\n");
      let inMultilineComment = false;
      let foundTags = [];

      lines.forEach((line) => {
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
          foundTags.push({ tag, message });
        }

        if (inMultilineComment && multilineCommentEnd.test(line)) {
          inMultilineComment = false;
        }
      });

      expect(
        foundTags.length,
        `Expected at least one tag in ${file}`
      ).toBeGreaterThan(0);

      // Optional: Log tags for clarity during testing
      foundTags.forEach(({ tag, message }) => {
        console.log(`Matched in ${file}: [${tag}] ${message}`);
      });
    }
  });
});
