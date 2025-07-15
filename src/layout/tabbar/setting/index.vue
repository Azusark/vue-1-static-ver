<template>
    <el-button 
        type="primary" 
        size="default" 
        :icon="settingStore.getRefreshStatus ? 'Loading' : 'Refresh'" 
        circle
        @click="handleRefresh"
        :loading="settingStore.getRefreshStatus"
    >
    </el-button>
    <el-button 
        type="primary" 
        size="default" 
        :icon="settingStore.getFullscreenStatus ? 'Aim' : 'FullScreen'" 
        circle
        @click="handleFullscreen"
    >
    </el-button>
    <el-button type="primary" size="default" icon="Setting" circle>
    </el-button>
    <img :src="userStore.avatar" style="width:48px;height:48px;margin:0px 20px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link" style="color:white">
            {{userStore.username}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import useSettingStore from '@/store/modules/setting';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

// 获取用户相关的小仓库
const userStore = useUserStore();
// 获取设置相关的小仓库
const settingStore = useSettingStore();
// 获取路由器对象
const $router = useRouter();

// 处理刷新功能
const handleRefresh = () => {
    settingStore.refreshPage();
};

// 处理全屏功能
const handleFullscreen = () => {
    settingStore.toggleFullscreen();
};

// 处理退出登录
const userLogout = async () => {
    // 1. 调用用户store的清除数据方法
    userStore.clearUserData();
    // 2. 更新设置store中的登录状态
    settingStore.setLoginStatus(false);
    // 3. 跳转到登录页面
    await $router.push({ path: '/login' });
    // 4. 刷新页面，确保路由和状态都已重置
    window.location.reload();
};

// 组件挂载时初始化全屏监听
onMounted(() => {
    settingStore.initFullscreenListener();
    // 设置初始登录状态
    settingStore.setLoginStatus(!!userStore.token);
});
</script>

<style scoped>
.el-button {
    margin-right: 8px;
}

.el-button:last-of-type {
    margin-right: 0;
}
</style>