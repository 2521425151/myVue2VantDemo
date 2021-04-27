const OrderRouter = [
  {
    path: '/cost',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    redirect: '/cost/orderList',
    children: [
      {
        path: 'orderList',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: 'orderDetail',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ]
  }
]
export default OrderRouter
