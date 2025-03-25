import { describe, it, expect } from "vitest";
import { scanComments } from "../index.js";

const EXPECTED_FOUND_TAGS = 46;

describe("scanComments", () => {
  it("should return the correct number of tags found", async () => {
    const foundTags = await scanComments(".");
    expect(foundTags).toBe(EXPECTED_FOUND_TAGS);
  });
});
