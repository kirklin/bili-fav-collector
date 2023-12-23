// 收藏夹信息中的 upper 对象类型
import type { AxiosResponse } from "axios";
import axios from "axios";

export interface UpperInfo {
  mid: number;
  name: string;
  face: string;
  followed: boolean;
  vip_type: number;
  vip_status: number;
}

// 收藏夹信息中的 cnt_info 对象类型
export interface CountInfo {
  collect: number;
  play: number;
  thumb_up: number;
  share: number;
}

// 收藏夹数据对象类型
export interface FolderData {
  id: number;
  fid: number;
  mid: number;
  attr: number;
  title: string;
  cover: string;
  upper: UpperInfo;
  cover_type: number;
  cnt_info: CountInfo;
  type: number;
  intro: string;
  ctime: number;
  mtime: number;
  state: number;
  fav_state: number;
  like_state: number;
  media_count: number;
}

// API响应的根对象类型
export interface FolderInfoResponse {
  code: number;
  message: string;
  ttl: number;
  data: FolderData | null;
}

// 获取收藏夹元数据的函数
export async function getFolderInfo(mediaId: number, cookie: string): Promise<FolderInfoResponse> {
  try {
    const response: AxiosResponse<FolderInfoResponse> = await axios.get(
      "https://api.bilibili.com/x/v3/fav/folder/info",
      {
        params: { media_id: mediaId },
        headers: {
          Cookie: cookie,
        },
      },
    );
    return response.data;
  } catch (error) {
    // 处理错误或异常情况
    throw new Error("Failed to fetch folder information");
  }
}
