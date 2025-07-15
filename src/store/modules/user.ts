//创建用户相关的小仓库
import { defineStore } from 'pinia';
//引入接口
import { login, reqUserInfo } from '@/api/user';
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type';
import type { UserState } from './types/type';
//引入路由(常量路由)
import { constantRoute } from '@/router/routes';
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
let useuseStore = defineStore('User', {
  //小仓库
  state: (): UserState => {
    return {
      token: GET_TOKEN(),  // 用户唯一标识token
      menuRoutes: constantRoute,
      username: '',
      avatar: '', //用户头像
    }
  },
  //异步
  actions: {
    //用户登录
    async handleLogin(data: loginForm) {
      //登录请求
      let result: loginResponseData = await login(data);
      //登录请求：成功200->token
      //登录请求：失败->登录失败错误的信息
      if (result.code === 200) {
        //pinia仓库存储一下token
        this.token = (result.data.token as string);
        //本地存储
        SET_TOKEN(result.data.token as string);
        //能保证当前async函数返回一个成功的promise
        return 'ok';
      }
      else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 清除用户数据（供设置store调用）
    clearUserData() {
      // 清除pinia中的token
      this.token = null;
      // 清除localStorage中的token
      REMOVE_TOKEN();
    },
    async userInfo() {
      //获取用户信息进行存储仓库
      let result = await reqUserInfo();
      console.log(result);
      if (result.code === 200) {

        this.username = result.data.checkUser.username ;
        this.avatar = result.data.checkUser.avatar ;
        
      }
      else{

      }
    }

  },
  getters: {

  }

})
//对外暴露获取小仓库方法
export default useuseStore;