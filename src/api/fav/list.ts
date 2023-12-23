import type { AxiosResponse } from "axios";
import axios from "axios";

// 定义 API 响应的数据类型
export interface ContentDetail {
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
    danmaku?: number;
  };
  link: string;
  ctime: number;
  pubtime: number;
  fav_time: number;
  bv_id: string;
  bvid: string;
  season: null;
}

export interface Info {
  id: number;
  fid: number;
  mid: number;
  attr: number;
  title: string;
  cover: string;
  upper: {
    mid: number;
    name: string;
    face: string;
    followed: boolean;
    vip_type: number;
    vip_statue: number;
  };
  cover_type: number;
  cnt_info: {
    collect: number;
    play: number;
    thumb_up: number;
    share: number;
  };
  type: number;
  intro: string;
  ctime: number;
  mtime: number;
  state: number;
  fav_state: number;
  like_state: number;
  media_count: number;
}

export interface ResponseData {
  code: number;
  message: string;
  data: {
    info: Info;
    medias: ContentDetail[];
    has_more: boolean;
  };
}

// 定义函数来获取收藏夹内容明细列表
export async function getFavoriteDetailList(mediaId: number, platform: string, page: number, pageSize: number, cookie: string): Promise<AxiosResponse<ResponseData>> {
  const url = "https://api.bilibili.com/x/v3/fav/resource/list";
  try {
    const response = await axios.get(url, {
      params: {
        media_id: mediaId,
        platform,
        pn: page,
        ps: pageSize,
      },
      headers: {
        Cookie: cookie,
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch favorite detail list: ${error}`);
  }
}

// 定义接口用于收藏夹内容 ID
export interface MediaId {
  id: number;
  type: number;
  bv_id: string;
  bvid: string;
}

// 定义函数来获取收藏夹全部内容 ID
export async function getFavoriteContentIds(mediaId: number, platform: string, cookie: string): Promise<AxiosResponse<{ code: number; message: string; data: MediaId[] }>> {
  const url = "https://api.bilibili.com/x/v3/fav/resource/ids";
  try {
    const response = await axios.get(url, {
      params: {
        media_id: mediaId,
        platform,
      },
      headers: {
        Cookie: cookie,
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch favorite content IDs: ${error}`);
  }
}
