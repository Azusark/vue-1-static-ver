<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu 
                    background-color=#444555 
                    text-color="#fff" 
                    active-text-color="#ffd04b"
                    :default-active="$route.path"
                    router
                >
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList=userStore.menuRoutes></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main>
                
            </Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//LOGO组件
import Logo from './logo/index.vue'
//菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue'
//引入tabbar 
import Tabbar from './tabbar/index.vue';
//获取
import useuseStore from '@/store/modules/user';
import { useRoute } from 'vue-router';

let userStore = useuseStore();
let $route = useRoute();
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background: white;
    overflow: hidden; // 防止外层滚动条
    

    .layout_slider {
        width: $base-menu-width+5px;
        height: 100vh;
        background: linear-gradient(to bottom, #33484e, #5a3f73);
        float: left;

        .logo {
            margin-bottom: 20px;
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: cyan;
        top: 0px;
        left: $base-menu-width;
        z-index: 10;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: #1f1e33;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto; // 只让这里滚动
    }
}
</style>