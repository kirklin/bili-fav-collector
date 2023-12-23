import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { BiliBiliFavoriteClient } from "../src";

describe("biliBiliFavoriteClient", () => {
  it("should fetch all favorite folders' content and save as Excel", async () => {
    // Replace with your UP主 ID and login Cookie
    const upMid = 32189285;
    const cookie = "YOUR_COOKIE";

    const client = new BiliBiliFavoriteClient(upMid, cookie);
    const folderContents = await client.getAllFoldersContent();

    // You can write assertions here to test the retrieved folder contents
    expect(Array.isArray(folderContents)).toBe(true);
    expect(folderContents.length).toBeGreaterThan(0);

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Folder Contents");

    // Add column headers to the worksheet
    worksheet.columns = [
      { header: "Folder ID", key: "folderId" },
      { header: "Folder Title", key: "folderTitle" },
      { header: "Media ID", key: "mediaId" },
      { header: "Media Title", key: "mediaTitle" },
      { header: "Media Duration", key: "mediaDuration" },
      { header: "Media Play Count", key: "mediaPlayCount" },
    ];

    // Process the folder contents and add them to the worksheet
    folderContents.forEach((folderArray) => {
      folderArray.forEach((folder) => {
        folder.medias.forEach((media) => {
          const row = worksheet.addRow({
            folderId: folder.info.id,
            folderTitle: folder.info.title,
            mediaId: media.id,
            mediaTitle: media.title,
            mediaDuration: media.duration,
            mediaPlayCount: media.cnt_info.play,
          });
          // Highlight the entire row if media title is "已失效视频"
          if (media.title === "已失效视频") {
            row.eachCell((cell) => {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF0000" }, // Red color as an example
              };
              cell.font = { bold: true }; // Make the text bold
            });
          }
        });
      });
    });

    // Save the Excel file
    const outputDir = path.join(__dirname, "test_results");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, "folderContents.xlsx");
    await workbook.xlsx.writeFile(outputFilePath);

    // Add more specific assertions as needed based on the structure of folderContents
  });
});
