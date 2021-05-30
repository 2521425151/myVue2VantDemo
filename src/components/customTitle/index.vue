<template>
  <div class="customTitle">
    <div>{{ titleName }}</div>
    <van-button
      v-if="onOff"
      @click.stop="$listeners.collapseDelete"
      hairline
      size="small"
      type="info"
    >
      删除
    </van-button>
  </div>
</template>

<script>
export default {
  props: {
    titleName: String,
    onOff: Boolean
  }
}
</script>

<style lang="scss" scope>
.customTitle {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  & > div::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background: #3669fe;
    vertical-align: text-bottom;
    border-radius: 2px;
    margin-right: 5px;
  }
  .van-button {
    height: 26px;
  }
}
</style>
