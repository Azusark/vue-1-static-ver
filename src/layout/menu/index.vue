<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 有子路由且只有一个子路由时，直接渲染子路由 -->
        <template v-if="item.children && item.children.length === 1 && item.meta.hidden==false">
            <Menu :menuList="item.children"></Menu>
        </template>
        
        <!-- 有多个子路由 -->
        <el-sub-menu v-else-if="item.children && item.children.length > 1 && item.meta.hidden==false" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
        
        <!-- 没有子路由 -->
        <el-menu-item v-else-if="!item.children&&item.meta.hidden==false" :index="item.path"  @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps(['menuList'])

let $router = useRouter()
let $route = useRoute()

// 计算当前激活的菜单项
const activeMenu = computed(() => {
    return $route.path
})

const goRoute = (vc:any) => {
    //路由跳转
    $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
    name: 'Menu',
}
</script>

<style scoped></style>