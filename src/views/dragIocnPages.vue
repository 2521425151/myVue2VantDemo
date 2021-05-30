<template>
  <div class="dragIocnPages" @click="isShowPop = false">
    <drag-icon @updateIsShowPop="val => (isShowPop = val)">
      <img :src="dragImg" @click.stop="() => (isShowPop = !isShowPop)" />
      <template slot="list" scope="slotProps">
        <div v-show="isShowPop" class="list" :style="{ top: slotProps.isTop ? '-190px' : '0px' }">
          <span>选项一</span><br />
          <span>选项二</span>
        </div>
      </template>
    </drag-icon>
  </div>
</template>

<script>
import dragImg from '@/assets/images/dragImg.svg'
export default {
  name: 'dragIocnPages',
  components: {
    DragIcon: () => import('@/components/common/dragIcon')
  },
  data() {
    return {
      dragImg,
      isShowPop: false,
      string: '',
      location: ''
    }
  }
}
</script>
<style type="text/css" scoped>
.list {
  background: #fff;
  text-align: center;
  box-shadow: 0px 2px 10px 1px #ddd;
  border-radius: 5px;
  padding-top: 10px;
  position: relative;
}
.list span {
  color: #fff;
  font-weight: bold;
  display: inline-block;
  padding: 15px 5px;
  border-radius: 5px;
  background: cornflowerblue;
  margin: 0 auto 10px auto;
}
.no-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.item {
  border-bottom: 1px solid #ddd;
}
p {
  margin: 0;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
.flex-wrap div {
  text-align: center;
  width: 25%;
  font-size: 13px;
}
.flex-wrap div img {
  width: 50%;
  margin-bottom: 10px;
  border-radius: 7px;
}
p:not(.title) {
  padding-bottom: 25px;
}
p.title {
  width: 100%;
  padding: 25px 15px;
  border-top: 1px solid #ddd;
  font-size: 15px;
  font-weight: 600;
}
p.title:first-child {
  border-top: none;
}
</style>
