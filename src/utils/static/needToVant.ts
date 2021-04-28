import 'vant/lib/divider/style'
import 'vant/lib/image/style'
import 'vant/lib/field/style'
import 'vant/lib/rate/style'
import 'vant/lib/button/style'
import 'vant/lib/toast/style'
import { Toast, Button, Rate, Field, Image as VanImage, Divider } from 'vant'
// vant 组件数组
const components = [Divider, VanImage, Field, Rate, Button, Toast]
// 自定vue义注册方法 vm 默认指向调用它的对象， main.js中 vue.use(needToVant); 所以vm指向Vue
export default {
  install: (vm: any) => {
    components.forEach(item => {
      vm.component(item.name, item)
    })
  }
}
