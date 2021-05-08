<template>
  <div class="myFormPages">
    <my-form :fieldArr="fieldArr" :formData="formData" ref="myform">
      <van-popup v-model="showSelect" position="bottom">
        <!-- 普通选择器 -->
        <van-picker
          show-toolbar
          :value-key="pickerValueKey"
          :columns="pickerColumns"
          @confirm="confirmSelect"
          @cancel="cancelSelect"
        />
      </van-popup>
      <van-popup v-model="showArea" position="bottom">
        <!-- 地区选择器 -->
        <van-area :area-list="areaList" @confirm="confirmSelect" @cancel="cancelSelect" />
      </van-popup>
      <!-- 日期选择器 -->
      <van-calendar v-model="showCalendar" @confirm="confirmSelect" />
    </my-form>
    <div class="bottomRegion">
      <van-button size="small" plain type="info" @click="myFormPagesSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import myForm from '@/components/myForm'
import { firstUpperCase, dateFormat } from '@/utils/dynamic/getString'
export default {
  name: 'myFormPages',
  components: {
    myForm
  },
  data() {
    return {
      fieldArr: [
        {
          name: 'input',
          label: '输入框',
          placeholder: '请输入',
          require: true,
          rules: [{ required: true, message: '这是必填' }]
        },
        {
          name: 'radio',
          label: '单选框',
          fieldSlot: true,
          fieldSlotType: 'radio',
          require: true,
          rules: [{ required: true, message: '这是必填' }],
          radioArr: [
            {
              name: 1,
              text: '是'
            },
            {
              name: 0,
              text: '否'
            }
          ]
        },
        {
          name: 'switch',
          label: '开关',
          fieldSlot: true,
          fieldSlotType: 'switch',
          require: true,
          rules: [{ required: true, message: '这是必填' }]
        },
        {
          name: 'uploader',
          label: '文件上传',
          fieldSlot: true,
          fieldSlotType: 'uploader',
          require: true,
          rules: [{ required: true, message: '这是必填' }]
        },
        {
          name: 'select',
          rightIcon: 'arrow',
          label: '下拉选择',
          placeholder: '请点击',
          require: true,
          rules: [{ required: true, message: '这是必填' }],
          readonly: true,
          clickable: true,
          click: val => {
            console.log(val, '下拉选择')
            this.currentName = val.name
            this.currentFieldType = 'select'
            this.showSelect = true
            this.pickerColumns = [
              {
                [this.pickerValueKey]: '无',
                value: '0'
              },
              {
                [this.pickerValueKey]: '一',
                value: '1'
              },
              {
                [this.pickerValueKey]: '二',
                value: '2'
              },
              {
                [this.pickerValueKey]: '三',
                value: '3'
              },
              {
                [this.pickerValueKey]: '四',
                value: '4'
              },
              {
                [this.pickerValueKey]: '五',
                value: '5'
              },
              {
                [this.pickerValueKey]: '六',
                value: '6'
              }
            ]
          }
        },
        {
          name: 'area',
          rightIcon: 'arrow',
          label: '地区选择',
          placeholder: '请点击',
          require: true,
          rules: [{ required: true, message: '这是必填' }],
          readonly: true,
          clickable: true,
          click: val => {
            console.log(val, '地区选择')
            this.currentName = val.name
            this.currentFieldType = 'area'
            this.showArea = true
            this.areaList = {
              province_list: {
                110000: '北京市',
                120000: '天津市'
              },
              city_list: {
                110100: '北京市',
                120100: '天津市'
              },
              county_list: {
                110101: '东城区',
                110102: '西城区',
                120101: '东城区',
                120102: '西城区'
              }
            }
          }
        },
        {
          name: 'calendar',
          label: '日期选择',
          rightIcon: 'arrow',
          placeholder: '请点击',
          require: true,
          rules: [{ required: true, message: '这是必填' }],
          readonly: true,
          clickable: true,
          click: val => {
            console.log(val, '日期选择')
            this.currentName = val.name
            this.currentFieldType = 'calendar'
            this.showCalendar = true
          }
        },
        {
          name: 'textarea',
          label: '多行文本框',
          placeholder: '请输入',
          require: true,
          rules: [{ required: true, message: '这是必填' }],
          autosize: true,
          rows: 6,
          type: 'textarea',
          maxlength: 200,
          inputAlign: 'left'
        }
      ],
      formData: {
        input: '',
        switch: true,
        radio: 1,
        select: ''
      },
      showSelect: false,
      pickerColumns: [],
      showArea: false,
      areaList: {},
      showCalendar: false,
      currentFieldType: '',
      currentName: '',
      pickerValueKey: 'text'
    }
  },
  computed: {},
  watch: {},
  methods: {
    confirmSelect(val) {
      this[`show${firstUpperCase(this.currentFieldType)}`] = false
      if (this.currentFieldType === 'select') {
        this.formData[this.currentName] = val[this.pickerValueKey]
      }
      if (this.currentFieldType === 'area') {
        this.formData[this.currentName] = val.map(item => item.name).join('/')
      }
      if (this.currentFieldType === 'calendar') {
        this.formData[this.currentName] = dateFormat(val, 'YYYY-MM-DD')
      }
    },
    cancelSelect() {
      this[`show${firstUpperCase(this.currentFieldType)}`] = false
    },
    myFormPagesSubmit() {
      this.$refs['myform'].$refs.myform
        .validate()
        .then(res => {
          console.log(res, 'res')
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
