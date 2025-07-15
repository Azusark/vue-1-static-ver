//统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from './type'
// 获取用户token的工具
import { GET_TOKEN } from '@/utils/token'

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
    LOGOUT_URL = '/user/logout',
}

// 模拟的后台用户数据
const users: any = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    buttons: [
      'btn.User.add',
      'btn.User.update',
      'btn.User.remove',
      'btn.Role.add',
      'btn.Role.update',
      'btn.Role.remove',
      'btn.Permission.add',
      'btn.Permission.update',
      'btn.Permission.remove',
    ],
    routes: [
      'User',
      'Role',
      'Permission',
      'Trademark',
      'Attr',
      'Spu',
      'Sku',
      'Screen',
    ],
  },
  'user-token': {
    roles: ['user'],
    introduction: 'I am an user',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal User',
    buttons: ['btn.User.add', 'btn.User.update', 'btn.User.remove'],
    routes: ['User', 'Role', 'Permission'],
  },
}

// 登录接口
export const login = (data: loginForm) => {
  // 生产环境下,模拟登录,因为mock服务只在开发环境有效
  if (import.meta.env.PROD) {
    if (
      (data.username === 'admin' || data.username === 'user1111') &&
      data.password === '111111'
    ) {
      return Promise.resolve<any>({
        code: 200,
        message: '登录成功',
        data: {
          token: `${data.username}-token`,
        },
      })
    } else {
      return Promise.resolve<any>({
        code: 400,
        message: '用户名或密码错误',
        data: {},
      })
    }
  }
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息
export const getUserInfo = () => {
  if (import.meta.env.PROD) {
    const token = GET_TOKEN()
    const info = users[token as string]
    if (info) {
      return Promise.resolve<any>({
        code: 200,
        message: '获取用户信息成功',
        data: {
          checkUser: info,
        },
      })
    } else {
      return Promise.resolve<any>({
        code: 50008,
        message: '登录失败，无法获取用户详细信息.',
        data: {},
      })
    }
  }
  return request.get<any, userResponseData>(API.USERINFO_URL)
}

// 退出登录
export const logout = () => {
  if (import.meta.env.PROD) {
    return Promise.resolve<any>({
      code: 200,
      message: '退出成功',
      data: {},
    })
  }
  return request.post<any, any>(API.LOGOUT_URL)
}


//new area 2025/7/2
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息接口方法
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);
//退出登录接口方法
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);