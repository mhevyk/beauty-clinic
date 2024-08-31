import getAvatarLabel from "@/containers/user-toolbar/utils/getAvatarLabel.ts";

describe("getAvatarLabel()", () => {
  it("should return the first two letters for a single-word username", () => {
    expect(getAvatarLabel("John")).toBe("JO");
  });

  it("should return the initials of the first two words for a multi-word username", () => {
    expect(getAvatarLabel("John Doe")).toBe("JD");
    expect(getAvatarLabel("Jane Smith")).toBe("JS");
    expect(getAvatarLabel("Alice Wonderland")).toBe("AW");
  });

  it("should handle usernames with extra spaces", () => {
    expect(getAvatarLabel("   John    Doe   ")).toBe("JD");
  });

  it("should return the single letter for a single-letter username", () => {
    expect(getAvatarLabel("A")).toBe("A");
  });
});
