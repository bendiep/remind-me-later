import { describe, it, expect } from "vitest";
import { scanComments } from "../index.js";

const EXPECTED_TOTAL_TAGS = 50;
const EXPECTED_TODO_TAGS = 28;
const EXPECTED_FIXME_TAGS = 22;

describe("scanComments", () => {
  it("should return the correct number of tags found", async () => {
    const result = await scanComments(".");
    expect(result).toStrictEqual({
      total: EXPECTED_TOTAL_TAGS,
      totalTodo: EXPECTED_TODO_TAGS,
      totalFixme: EXPECTED_FIXME_TAGS,
    });
  });
});
