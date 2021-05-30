const OrderRouter = [
  {
    path: 'orderList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
  },
  {
    path: 'orderDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
  }
]
export default OrderRouter
