import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/index.vue'
import Login from '@/views/login.vue'
import NotFound from '@/views/404.vue'
import Admin from '@/layout/admin.vue'
import UserList from '@/views/user/UserList.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

const routes = [
  {
    path: '/',
    component: Admin,
    children: [
      {
        path: '/',
        component: Index,
        name: '后台首页'
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('../views/admin/MenuView.vue')
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('../views/admin/RoleView.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../views/admin/UserView.vue')
      },
      {
        path: '/user/list',
        component: UserList,
        name: '测试界面'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: '登录'
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
