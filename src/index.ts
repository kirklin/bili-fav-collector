import { getCreatedFolders } from "./api/fav/info/getCreatedFolders";
import { getFavoriteDetailList } from "./api/fav/list";

// 获取单个收藏夹的内容明细
async function getFolderDetail(folderId: number, pageSize: number, cookie: string) {
  try {
    const detailListResponse = await getFavoriteDetailList(folderId, "web", 1, pageSize, cookie);
    const detailList = detailListResponse.data;
    // 在这里进行进一步处理或保存数据等操作
    console.log(detailList.data.medias);
    // 返回详细列表数据（可选）
    return detailList;
  } catch (error) {
    console.error(`Error fetching folder ${folderId} details: ${error}`);
    throw error;
  }
}

// 获取所有收藏夹的内容明细
async function getAllFoldersContent(upMid: number, cookie: string) {
  try {
    console.log("Fetching all favorite folders' information...");
    const createdFoldersResponse = await getCreatedFolders(upMid, cookie);

    for (const folder of createdFoldersResponse?.data?.list || []) {
      console.log(`Fetching content for folder ID: ${folder.id}`);

      const pageSize = 20;
      const totalPage = Math.ceil(folder.media_count / pageSize);

      // 分页获取收藏夹内容明细列表
      for (let page = 1; page <= totalPage; page++) {
        await getFolderDetail(folder.id, pageSize, cookie);
      }
    }
  } catch (error) {
    console.error("Error occurred: ", error);
    // 可以添加错误处理逻辑，比如记录错误或执行其他操作
  }
}

// 调用函数示例
const upMid = 32189285; // 替换为你的UP主ID
const cookie = "YOUR_COOKIE"; // 替换为你的登录Cookie
getAllFoldersContent(upMid, cookie).then();
