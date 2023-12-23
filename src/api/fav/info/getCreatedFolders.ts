// 收藏夹信息中的 upper 对象类型
import type { AxiosResponse } from "axios";
import axios from "axios";

// 单个收藏夹信息类型
export interface FolderListItem {
  id: number;
  fid: number;
  mid: number;
  attr: number;
  title: string;
  fav_state: number;
  media_count: number;
}

// API响应的根对象类型
export interface CreatedFolderResponse {
  code: number;
  message: string;
  ttl: number;
  data: {
    count: number;
    list: FolderListItem[];
    season: null;
  };
}

// 获取指定用户创建的所有收藏夹信息的函数
export async function getCreatedFolders(upMid: number, cookie?: string): Promise<CreatedFolderResponse> {
  try {
    const response: AxiosResponse<CreatedFolderResponse> = await axios.get(
      "https://api.bilibili.com/x/v3/fav/folder/created/list-all",
      {
        params: { up_mid: upMid },
        headers: {
          Cookie: cookie,
        },
      },
    );
    return response.data;
  } catch (error) {
    // 处理错误或异常情况
    throw new Error("Failed to fetch created folders");
  }
}
