import type { RouteRecordRaw } from "vue-router";
//定义小仓库数据state类型
export interface UserState {
  token: string|null;
  menuRoutes:RouteRecordRaw[],
  username: string; 
  avatar: string; // 用户头像
}

// 通用数据项类型
export interface DataItem {
  id: number;
  name: string;
  status: boolean;
  createTime: string;
  [key: string]: any; // 允许其他属性
}

// 分页参数类型
export interface PaginationParams {
  current: number;
  size: number;
  total: number;
}

// 搜索参数类型
export interface SearchParams {
  keyword: string;
  [key: string]: any;
}