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

const EXPECTED_TEST_FILES = 6;
const EXPECTED_FOUND_TAGS = 46;

describe("remind-me-later real-file tests", () => {
  it("correctly identifies TODO and FIXME comments in example files", async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const exampleDir = path.resolve(__dirname, "./examples");
    const files = await fg(["**/*.{js,ts,jsx,tsx,html,css}"], {
      cwd: exampleDir,
    });

    expect(files.length).toBe(EXPECTED_TEST_FILES);

    let totalFoundTags = 0;
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

      totalFoundTags += foundTags.length;

      foundTags.forEach(({ tag, message }) => {
        console.log(`Matched in ${file}: [${tag}] ${message}`);
      });
    }

    expect(totalFoundTags).toBe(EXPECTED_FOUND_TAGS);
  });
});
