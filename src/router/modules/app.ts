const OrderRouter = [
  {
    path: '/dynamicCollapseForm',
    component: () => import(/* webpackChunkName: "about" */ '@/views/dynamicCollapseForm.vue')
  },
  {
    path: '/dragIocnPages',
    component: () => import(/* webpackChunkName: "about" */ '@/views/dragIocnPages.vue')
  }
]
export default OrderRouter
