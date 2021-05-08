const formRouter = [
  {
    path: '/myFormPages',
    component: () => import(/* webpackChunkName: "myFormPages" */ '@/views/myFormPages.vue')
  }
]
export default formRouter
