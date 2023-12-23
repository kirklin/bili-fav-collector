import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";
import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import axios from "axios";
import { BiliBiliFavoriteClient } from "../src";

// Function to convert image URL to base64
async function getBase64Image(url: string): Promise<string | null> {
  try {
    console.log("正在下载图片,url:", url);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
}

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
      { header: "Media Description", key: "mediaDescription" },
      { header: "Media Cover URL", key: "mediaCoverURL" }, // Changed column header name
      { header: "Media Type", key: "mediaType" },
      { header: "UP主 ID", key: "upId" },
      { header: "UP主 Name", key: "upName" },
      // Add more headers for additional media fields as needed
    ];

    // Process the folder contents and add them to the worksheet
    for (const folderArray of folderContents) {
      for (const folder of folderArray) {
        for (const media of folder.medias) {
          if (media == null) {
            break;
          }
          const row = worksheet.addRow({
            folderId: folder.info.id,
            folderTitle: folder.info.title,
            mediaId: media.id,
            mediaTitle: media.title,
            mediaDuration: media.duration,
            mediaPlayCount: media.cnt_info.play,
            mediaDescription: media.intro,
            mediaType: media.type,
            upId: media.upper?.mid || "",
            upName: media.upper?.name || "",
          });
          worksheet.columns.forEach((column) => {
            column.width = 20;
          });
          // Inside the loop after adding the image to the worksheet
          // Adjust row height for the row with lengthy text (Media Description)
          row.height = Math.max(row.height || 100, Math.ceil(media.intro.length / 100) * 15); // Adjust the division factor (50) and multiplier (15) as needed

          // Enable text wrapping for the Media Description column
          worksheet.getColumn("mediaDescription").width = 60; // Adjust width as needed
          worksheet.getColumn("mediaDescription").alignment = { wrapText: true };
          worksheet.getColumn("mediaTitle").width = 50; // Adjust width as needed
          worksheet.getColumn("mediaTitle").alignment = { wrapText: true };
          worksheet.getColumn("mediaCoverURL").width = 35; // Adjust width as needed

          // Convert media cover URL to base64
          const base64Image = await getBase64Image(media.cover);
          // Add image to a specific column for media cover base64
          if (base64Image) {
            const imageId = workbook.addImage({
              base64: base64Image,
              extension: "png",
            });

            worksheet.addImage(imageId, {
              tl: { col: 7, row: row.number - 1 }, // Adjust column index as needed
              ext: { width: 250, height: 150 }, // Define width and height in pixels (96dpi)
              editAs: "oneCell", // Ensures the image size fits within one cell
            });
          }

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
        }
      }
    }

    // Save the Excel file
    // Remaining code to save the file remains the same

    const outputDir = path.join(__dirname, "test_results");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, "folderContents.xlsx");
    await workbook.xlsx.writeFile(outputFilePath);

    // Add more specific assertions as needed based on the structure of folderContents
  });
}, { timeout: -1 });
