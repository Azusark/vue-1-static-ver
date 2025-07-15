// 创建设置相关的小仓库
import { defineStore } from 'pinia';
import type { SettingState } from './types/setting';

let useSettingStore = defineStore('Setting', {
  // 小仓库
  state: (): SettingState => {
    return {
      isFullscreen: false, // 全屏状态
      isRefreshing: false, // 刷新状态
      isLoggedIn: false,   // 登录状态
    }
  },
  // 异步
  actions: {
    // 切换全屏状态
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      
      if (this.isFullscreen) {
        // 进入全屏
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          (document.documentElement as any).msRequestFullscreen();
        }
      } else {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    },

    // 刷新页面
    refreshPage() {
      this.isRefreshing = true;
      // 延迟刷新，给用户视觉反馈
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },

    // 设置登录状态
    setLoginStatus(status: boolean) {
      this.isLoggedIn = status;
    },

    // 监听全屏状态变化
    initFullscreenListener() {
      const handleFullscreenChange = () => {
        this.isFullscreen = !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).msFullscreenElement
        );
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('msfullscreenchange', handleFullscreenChange);
    }
  },
  getters: {
    // 获取全屏状态
    getFullscreenStatus: (state) => state.isFullscreen,
    // 获取刷新状态
    getRefreshStatus: (state) => state.isRefreshing,
    // 获取登录状态
    getLoginStatus: (state) => state.isLoggedIn,
  }
})

// 对外暴露获取小仓库方法
export default useSettingStore; 