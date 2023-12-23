import { getCreatedFolders } from "./api/fav/info/getCreatedFolders";
import { getFavoriteDetailList } from "./api/fav/list";

export class BiliBiliFavoriteClient {
  private readonly upMid: number;
  private readonly cookie: string;

  constructor(upMid: number, cookie: string) {
    this.upMid = upMid;
    this.cookie = cookie;
  }

  public async getFolderDetail(folderId: number, page: number, pageSize: number) {
    try {
      const detailListResponse = await getFavoriteDetailList(folderId, "web", page, pageSize, this.cookie);
      const detailList = detailListResponse.data;
      // Return media details (modify this based on actual response structure)
      return detailList;
    } catch (error) {
      console.error(`Error fetching folder ${folderId} details: ${error}`);
      throw error;
    }
  }

  public async getAllFoldersContent() {
    try {
      console.debug("Fetching all favorite folders' information...");
      const createdFoldersResponse = await getCreatedFolders(this.upMid, this.cookie);

      const allFolderDetails = [];
      for (const folder of createdFoldersResponse?.data?.list || []) {
        console.debug(`Fetching content for folder ID: ${folder.id}`);
        const pageSize = 20;
        const totalPage = Math.ceil(folder.media_count / pageSize);
        const folderDetails = [];

        // Fetch and accumulate details for each page of folder content
        for (let page = 1; page <= totalPage; page++) {
          const detail = await this.getFolderDetail(folder.id, page, pageSize);
          if (detail?.data !== null) {
            folderDetails.push(detail.data);
          }
        }

        allFolderDetails.push(folderDetails);
      }

      return allFolderDetails;
    } catch (error) {
      console.error("Error occurred: ", error);
      // Handle errors or add error logging here
      throw error;
    }
  }
}
