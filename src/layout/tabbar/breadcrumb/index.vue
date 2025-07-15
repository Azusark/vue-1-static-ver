<template>
    <el-icon style="margin-right: 10px;">
        <Expand />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item 
            v-for="(item,index) in filteredBreadcrumbs" 
            :key="index" 
            style="font-size:20px"
            @click="handleClick(item, index)"
            :class="{ 'clickable': index !== filteredBreadcrumbs.length - 1 }"
        >
            <el-icon>
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { constantRoute } from '@/router/routes';

let $route = useRoute();
let $router = useRouter();

// 过滤面包屑，跳过只有一个子路由的父级路由
const filteredBreadcrumbs = computed(() => {
    const matched = $route.matched;
    const filtered: any[] = [];
    
    for (let i = 0; i < matched.length; i++) {
        const current = matched[i];
        
        // 查找当前路由在路由配置中的定义
        const routeConfig = findRouteConfig(current.path);
        
        // 如果当前路由有子路由且只有一个子路由，跳过当前路由
        if (routeConfig && routeConfig.children && routeConfig.children.length === 1) {
            // 跳过当前路由，继续处理下一个
            continue;
        }
        
        filtered.push(current);
    }
    
    return filtered;
});

// 查找路由配置
const findRouteConfig = (path: string) => {
    const findInRoutes = (routes: any[]): any => {
        for (const route of routes) {
            if (route.path === path) {
                return route;
            }
            if (route.children) {
                const found = findInRoutes(route.children);
                if (found) return found;
            }
        }
        return null;
    };
    
    return findInRoutes(constantRoute);
};

// 处理面包屑点击
const handleClick = (item: any, index: number) => {
    // 如果是最后一个面包屑项（当前页面），不进行跳转
    if (index === filteredBreadcrumbs.value.length - 1) {
        return;
    }
    
    // 跳转到对应的路由
    $router.push(item.path);
};
</script>

<style scoped>
/* 可点击的面包屑项样式 */
:deep(.clickable) {
    cursor: pointer !important;
}

:deep(.clickable .el-breadcrumb__inner) {
    color: #000000 !important;
    transition: color 0.3s;
}

:deep(.clickable:hover .el-breadcrumb__inner) {
    color: #557eaa !important;
}

/* 不可点击的面包屑项样式 */
:deep(.el-breadcrumb__item:not(.clickable) .el-breadcrumb__inner) {
    color: #606266 !important;
    cursor: default;
}
</style>