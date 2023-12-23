// 收藏夹信息中的 upper 对象类型
import type { AxiosResponse } from "axios";
import axios from "axios";

// 单个内容信息类型
interface ResourceInfo {
  id: number;
  type: number;
  title: string;
  cover: string;
  intro: string;
  page: number;
  duration: number;
  upper: {
    mid: number;
    name: string;
    face: string;
  };
  attr: number;
  cnt_info: {
    collect: number;
    play: number;
    danmaku: number;
  };
  link: string;
  ctime: number;
  pubtime: number;
  fav_time: number;
  bv_id: string;
  bvid: string;
  season: null;
}

// API响应的根对象类型
interface ResourceInfosResponse {
  code: number;
  message: string;
  ttl: number;
  data: ResourceInfo[];
}

// 批量获取指定收藏id的内容的函数
export async function getResourceInfos(resources: string, platform?: string): Promise<ResourceInfosResponse> {
  try {
    const response: AxiosResponse<ResourceInfosResponse> = await axios.get(
      "https://api.bilibili.com/x/v3/fav/resource/infos",
      {
        params: { resources, platform },
      },
    );
    return response.data;
  } catch (error) {
    // 处理错误或异常情况
    throw new Error("Failed to fetch resource infos");
  }
}
