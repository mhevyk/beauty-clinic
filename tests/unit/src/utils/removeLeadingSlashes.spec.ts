import removeLeadingSlashes from "@/utils/remove-leading-slashes/removeLeadingSlashes";

describe("removeLeadingSlashes", () => {
  it("should remove slash in the end", () => {
    expect(removeLeadingSlashes("/about")).toBe("about");
  });
});
