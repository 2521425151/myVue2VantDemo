<template>
  <div class="myFormFields">
    <template v-for="item in $attrs.fieldArr">
      <van-field
        v-if="!item['fieldSlot']"
        v-model="$attrs.formData[item.name]"
        :right-icon="item['rightIcon'] || null"
        :key="item.name"
        :class="[
          { textareaField: item['type'] && item.type === 'textarea' },
          { requireStar: item.require }
        ]"
        :label="item.label"
        :name="`${item.name}-${collapseIndex}`"
        :placeholder="item.placeholder"
        :input-align="item.inputAlign || 'right'"
        :rules="item['rules'] ? item.rules : []"
        :maxlength="item['maxlength'] ? item.maxlength : 200"
        :type="item['type'] ? item.type : 'text'"
        :autosize="item['autosize'] ? item.autosize : false"
        :rows="item['rows'] ? item.rows : 1"
        :readonly="item['readonly'] ? item.readonly : false"
        :clickable="item['clickable'] ? item.clickable : false"
        @click="item['click'] ? item.click(item, collapseIndex) : null"
      />
      <van-field
        v-else
        :key="item.name"
        :class="[
          { textareaField: item['type'] && item.type === 'textarea' },
          { requireStar: item.require }
        ]"
        :label="item.label"
        :name="`${item.name}-${collapseIndex}`"
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
            v-model="$attrs.formData[item.name]"
            direction="horizontal"
          >
            <van-radio v-for="item in item.radioArr" :key="item.name" :name="item.name">{{
              item.text
            }}</van-radio>
          </van-radio-group>
          <!-- 开关 -->
          <van-switch
            v-if="item['fieldSlotType'] && item['fieldSlotType'] === 'switch'"
            v-model="$attrs.formData[item.name]"
            :size="20"
          />
          <!-- 文件上传 -->
          <van-uploader
            v-if="item['fieldSlotType'] && item['fieldSlotType'] === 'uploader'"
            :max-count="2"
            v-model="$attrs.formData[item.name]"
            accept=".png, .jpg, .jpeg"
            :max-size="10 * 1024 * 1024"
            @oversize="onOversize"
            :after-read="val => afterRead(val, item.name)"
            :before-read="beforeRead"
          />
        </template>
      </van-field>
    </template>
    <slot>
      <van-popup v-model="showSelect" position="bottom">
        <!-- 普通选择器 -->
        <van-picker
          show-toolbar
          :value-key="$attrs.pickerValueKey"
          :columns="$attrs.pickerColumns"
          @confirm="$listeners.confirmSelect"
          @cancel="$listeners.cancelSelect"
        />
      </van-popup>
      <van-popup v-model="showArea" position="bottom">
        <!-- 地区选择器 -->
        <van-area
          :area-list="$attrs.areaList"
          @confirm="$listeners.confirmSelect"
          @cancel="$listeners.cancelSelect"
        />
      </van-popup>
      <!-- 日期选择器 -->
      <van-calendar v-model="showCalendar" @confirm="$listeners.confirmSelect" />
    </slot>
  </div>
</template>
<script>
// $attrs 属性
/* 
  //表单列详情
  fieldArr: Array
  //表单列数据
  formData: Object
  // 选项对象中，选项文字对应的键名
  pickerValueKey
  // 普通选择数据
  pickerColumns：Array
  // 地区选择器数据
  areaList：Object
  // 当前选择的 field 类型
  currentFieldType: String
*/
// $listeners
/* 
  // 确认回调方法
  confirmSelect：Function
  // 取消回调方法
  cancelSelect：Function 
*/
export default {
  computed: {
    showSelect: {
      // 在祖籍给 this.$attrs.currentFieldType 赋值 普通computed会报错 没有 setter 所以使用 get set 方式
      // set get 必须使用 普通函数 使用箭头函数会使 this 指向 undefined
      set: function (v) {
        this.$attrs.currentFieldType = v
      },
      get: function () {
        return this.$attrs.currentFieldType === 'select'
      }
    },
    showArea: {
      set: function (v) {
        this.$attrs.currentFieldType = v
      },
      get: function () {
        return this.$attrs.currentFieldType === 'area'
      }
    },
    showCalendar: {
      set: function (v) {
        this.$attrs.currentFieldType = v
      },
      get: function () {
        return this.$attrs.currentFieldType === 'calendar'
      }
    },
    collapseIndex: {
      set: function (v) {
        this.$attrs['collapseIndex'] = v
      },
      get: function () {
        return this.$attrs['collapseIndex'] || 0
      }
    }
  },
  methods: {
    onOversize(file) {
      Toast('图片大小不能超过 10M')
    },
    afterRead(file, name) {},
    beforeRead(file) {
      if (!/image\/[a-zA-z]+/.test(file.type)) {
        Toast('只能上传图片')
        return false
      }
      return true
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>
<style lang="scss" scoped>
.myFormFields {
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
