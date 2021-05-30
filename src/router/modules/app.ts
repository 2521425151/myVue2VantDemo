const OrderRouter = [
  {
    path: '/dynamicCollapseForm',
    component: () => import(/* webpackChunkName: "about" */ '@/views/dynamicCollapseForm.vue')
  },
  {
    path: '/orderDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
  }
]
export default OrderRouter
