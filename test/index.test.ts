import { describe, expect, it } from "vitest";

import { BiliBiliFavoriteClient } from "../src";

// Import the BiliBiliFavoriteClient class

describe("biliBiliFavoriteClient", () => {
  it("should fetch all favorite folders' content", async () => {
    // Replace with your UP主 ID and login Cookie
    const upMid = 32189285;
    const cookie = "YOUR_COOKIE";

    const client = new BiliBiliFavoriteClient(upMid, cookie);
    const folderContents = await client.getAllFoldersContent();

    // You can write assertions here to test the retrieved folder contents
    expect(Array.isArray(folderContents)).toBe(true);
    expect(folderContents.length).toBeGreaterThan(0);

    // Add more specific assertions as needed based on the structure of folderContents
  });
});
