//对外暴露配置路由（常量路由）

import { createLoadingComponent } from 'element-plus/es/components/loading/src/loading.mjs';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { fa } from 'element-plus/es/locales.mjs';

export const constantRoute = [{
    //登录页面
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录',//标题
        hidden: true,//是否隐藏
        icon: "Promotion",//图标,已全局注册element-plus所有图标
    }
},

{
    //主页
    path: '/',
    name: '用户',
    meta: {
        title: '用户',
        hidden: false,
        icon: "UserFilled",//图标
        
    },
    redirect: 'home',//重定向
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: '首页',//菜单标题
                hidden: false,
                icon: "HomeFilled"//图标
            }
        },

    ]

},

{
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
        title: '404',
        hidden: true,
        icon: 'DocumentDelete'
    }
},

{
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
        hidden: false,
        title: '数据展示',
        icon: 'Platform'
    }
},

{
    //其它
    path: '/acl',
    component: () => import('@/layout/index.vue'), // 关键：指定了布局组件
    name: 'Acl',
    redirect: '/acl/user', // 重定向到第一个子路由
    meta: {
        title: '权限管理',
        hidden: false,
        icon: 'Lock'
    },
    children: [
        {
            path: '/acl/user',
            component: () => import('@/views/acl/user/index.vue'),
            name: 'user',
            meta: {
                title: '用户管理',
                hidden: false,
                icon: 'User'
            }
        },
        {
            path: '/acl/role',
            component: () => import('@/views/acl/role/index.vue'),
            name: 'Role',
            meta: {
                title: '角色管理',
                hidden: false,
                icon: 'UserFilled'
            }
        },
        {
            path: '/acl/permission',
            component: () => import('@/views/acl/permission/index.vue'),
            name: 'Permission',
            meta: {
                title: '菜单管理',
                hidden: false,
                icon: 'Monitor'
            }
        }
    ]
},

{
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/trademark', // 重定向到第一个子路由
    meta: {
        hidden: false,
        title: '商品管理',
        icon: 'Goods'
    },
    children: [
        {
            path: '/product/trademark',
            component: () => import('@/views/product/trademark/index.vue'),
            name: "Trademark",
            meta: {
                hidden: false,
                title: '品牌管理',
                icon: 'ShoppingCartFull',
            }
        },
        {
            path: '/product/attr',
            component: () => import('@/views/product/attr/index.vue'),
            name: "attr",
            meta: {
                hidden: false,
                title: '属性管理',
                icon: 'ChromeFilled',
            }
        },
        {
            path: '/product/spu',
            component: () => import('@/views/product/spu/index.vue'),
            name: "spu",
            meta: {
                hidden: false,
                title: 'SPU管理',
                icon: 'Calendar'
            }
        },
        {
            path: '/product/sku',
            component: () => import('@/views/product/sku/index.vue'),
            name: "sku",
            meta: {
                title: 'SKU管理',
                icon: 'Orange',
                hidden: false,
            },
        }

    ]
},

{
    //其它
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
        icon: 'DataLine'
    }
}

]