<template>
  <van-form class="myForm" :validate-first="validateFirst" validate-trigger="onChange" ref="myform">
    <my-form-fields v-bind="$attrs" v-on="$listeners"></my-form-fields>
  </van-form>
</template>

<script>
import myFormFields from '@/components/myForm/components/myFormFields'
export default {
  props: {
    validateFirst: {
      type: Boolean,
      default: false
    }
  },
  components: {
    myFormFields
  }
}
</script>
<style lang="scss" scoped></style>
