import removeLeadingSlashes from "@/utils/remove-leading-slashes/removeLeadingSlashes";

describe("removeLeadingSlashes()", () => {
  it("should remove slash in the start", () => {
    expect(removeLeadingSlashes("/about")).toBe("about");
  });
  it("should remove all slashes if there are only slashes", () => {
    expect(removeLeadingSlashes("////")).toBe("");
  })
  it("should keep last slashes", () => {
    expect(removeLeadingSlashes("about/")).toBe("about/")
    expect(removeLeadingSlashes("about///")).toBe("about///")
  })
  it("should return an empty string when the argument is empty string", () => {
    expect(removeLeadingSlashes("")).toBe("");
  })
});
