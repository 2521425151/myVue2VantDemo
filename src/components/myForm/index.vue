<template>
  <van-form class="myForm" :validate-first="validateFirst" validate-trigger="onChange" ref="myform">
    <template v-for="item in fieldArr">
      <van-field
        v-if="!item['fieldSlot']"
        v-model="formData[item.name]"
        :right-icon="item['rightIcon'] || null"
        :key="item.name"
        :class="[
          { textareaField: item['type'] && item.type === 'textarea' },
          { requireStar: item.require }
        ]"
        :label="item.label"
        :name="item.name"
        :placeholder="item.placeholder"
        :input-align="item.inputAlign || 'right'"
        :rules="item['rules'] ? item.rules : []"
        :maxlength="item['maxlength'] ? item.maxlength : 200"
        :type="item['type'] ? item.type : 'text'"
        :autosize="item['autosize'] ? item.autosize : false"
        :rows="item['rows'] ? item.rows : 1"
        :readonly="item['readonly'] ? item.readonly : false"
        :clickable="item['clickable'] ? item.clickable : false"
        @click="item['click'] ? item.click(item) : null"
      />
      <van-field
        v-else
        :key="item.name"
        :class="[
          { textareaField: item['type'] && item.type === 'textarea' },
          { requireStar: item.require }
        ]"
        :label="item.label"
        :name="item.name"
        :placeholder="item.placeholder"
        :input-align="item.inputAlign || 'right'"
        :rules="item['rules'] ? item.rules : []"
        :maxlength="item['maxlength'] ? item.maxlength : 200"
        :type="item['type'] ? item.type : 'text'"
        :autosize="item['autosize'] ? item.autosize : false"
        :rows="item['rows'] ? item.rows : 1"
      >
        <template #input>
          <!-- 单选框 -->
          <van-radio-group
            v-if="item['radioArr'] && item['fieldSlotType'] && item['fieldSlotType'] === 'radio'"
            v-model="formData[item.name]"
            direction="horizontal"
          >
            <van-radio v-for="item in item.radioArr" :key="item.name" :name="item.name">{{
              item.text
            }}</van-radio>
          </van-radio-group>
          <!-- 开关 -->
          <van-switch
            v-if="item['fieldSlotType'] && item['fieldSlotType'] === 'switch'"
            v-model="formData[item.name]"
            :size="20"
          />
          <!-- 文件上传 -->
          <van-uploader
            v-if="item['fieldSlotType'] && item['fieldSlotType'] === 'uploader'"
            v-model="formData[item.name]"
          />
        </template>
      </van-field>
    </template>
    <slot></slot>
  </van-form>
</template>

<script>
export default {
  props: {
    // 表单列详情
    fieldArr: {
      type: Array,
      default: () => []
    },
    // 表单列数据
    formData: {
      type: Object,
      default: () => {}
    },
    validateFirst: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.myForm {
  /deep/.requireStar {
    .van-field__label {
      font-size: 16px;
      font-weight: 400;
      &::before {
        content: '*';
        color: #ea6e2f;
      }
    }
  }
  /deep/.textareaField {
    flex-direction: column;
    .van-cell__value {
      border: 1px solid #e7e9ef;
      padding: 10px;
      border-radius: 4px;
    }
  }
}
</style>
