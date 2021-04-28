<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>
<script>
import { sendGet } from '@/utils/static/requestWay'
export default {
  created() {
    // mock 接口测试
    sendGet('/api/test').then(res => {
      console.log(res)
    })
  }
}
</script>
