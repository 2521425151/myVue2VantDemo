export default (Vue: any, router: any, store: any, allowsArr: Array<string>) => {
  // 注册   按需引入的vuex modules
  Vue.use(function () {
    Vue.mixin({
      beforeCreate: function () {
        // $options是组件选项，包含组件.vue文件的 `export default` 的属性
        // 为了拿到在组件定义的是否按需加载的属性值 `isNeedVuex`
        let name: any = this.$options['name']
        if (name && allowsArr.includes(name)) {
          // 需要设置.vue文件的name属性，跟单文件组件名字命名一样
          import('@/store/modules/' + name).then(res => {
            // res.default就是代表我们在store/modules文件夹下对应文件的export default对象
            // registerModule是vuex自带的方法，请自行搜索
            // 第一个参数是动态注入的模块名，第二个参数是模块导出对象
            this.$store.registerModule(name, res.default)
          })
        }
      }
    })
  })
  // 注销  按需引入的vuex modules
  router.beforeEach((to: any, from: any, next: any) => {
    if (from.name && allowsArr.includes(from.name)) {
      // unregisterModule跟前面的registerModule对应，是vuex的api，请自行搜索
      store.unregisterModule(from.name)
    }
    // <!--to do others-->
    next()
  })
}