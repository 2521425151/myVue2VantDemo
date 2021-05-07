import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 这将为该路由生成一个单独的块 about[hash].js
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/About.vue')
  }
]
// 使用 require.context 动态加载modules文件的 router 模块
const requiredModules = require.context('./modules', false, /\.ts$/)
requiredModules.keys().forEach(fileName => {
  routes.push(...(requiredModules(fileName).default || requiredModules(fileName)))
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
