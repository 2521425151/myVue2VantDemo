<template>
  <!-- 动态添加可折叠的表单 -->
  <div class="dynamicCollapse">
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />
    <van-form class="myForm" :validate-first="false" validate-trigger="onChange" ref="myform">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in collapseArr" :key="index" :name="index">
          <template #title>
            <custom-title
              :titleName="`标题-${index}`"
              :onOff="true"
              @collapseDelete="collapseDelete(index)"
            ></custom-title>
          </template>

          <my-form-fields
            :collapseIndex="index"
            :fieldArr="fieldArr"
            :formData="item"
            :pickerColumns="pickerColumns"
            :areaList="areaList"
            :currentFieldType="currentFieldType"
            :pickerValueKey="pickerValueKey"
            @confirmSelect="confirmSelect"
            @cancelSelect="cancelSelect"
          />
        </van-collapse-item>
      </van-collapse>
    </van-form>
    <div class="addButton">
      <van-button icon="plus" type="info" @click="addFormField">添加一条信息</van-button>
    </div>
    <div class="bottomRegion">
      <van-button size="small" plain type="info" @click="dynamicCollapseSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import myFormFields from '@/components/myForm/components/myFormFields'
import customTitle from '@/components/customTitle'

import { dateFormat } from '@/utils/dynamic/getString'
export default {
  name: 'dynamicCollapse',
  components: {
    myFormFields,
    customTitle
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
          click: (val, index) => {
            console.log(val, '下拉选择')
            this.collapseIndex = index
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
          click: (val, index) => {
            console.log(val, '地区选择')
            this.collapseIndex = index
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
          click: (val, index) => {
            console.log(val, index, '日期选择')
            this.collapseIndex = index
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
      collapseArr: [
        {
          id: 1,
          input: '',
          switch: true,
          radio: 1,
          select: ''
        },
        {
          id: 2,
          input: '',
          switch: true,
          radio: 1,
          select: ''
        }
      ],
      activeNames: ['1'],
      pickerColumns: [],
      areaList: {},
      currentFieldType: '',
      currentName: '',
      pickerValueKey: 'text'
    }
  },
  methods: {
    addFormField() {
      this.collapseArr.push({
        id: this.collapseArr.length,
        input: '',
        switch: true,
        radio: 1,
        select: ''
      })
    },
    collapseDelete(index) {
      this.collapseArr.splice(index, 1)
      console.log(index, 'collapseDelete')
    },
    confirmSelect(val) {
      if (this.currentFieldType === 'select') {
        this.collapseArr[this.collapseIndex][this.currentName] = val[this.pickerValueKey]
      }
      if (this.currentFieldType === 'area') {
        this.collapseArr[this.collapseIndex][this.currentName] = val
          .map(item => item.name)
          .join('/')
      }
      if (this.currentFieldType === 'calendar') {
        this.collapseArr[this.collapseIndex][this.currentName] = dateFormat(val, 'YYYY-MM-DD')
      }
      this.currentFieldType = ''
    },
    cancelSelect() {
      this.currentFieldType = ''
    },
    dynamicCollapseSubmit() {
      this.$refs.myform
        .validate()
        .then(res => {
          console.log(res, 'res')
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.dynamicCollapse {
  /deep/.van-cell--clickable {
    display: flex;
    align-items: center;
  }
}
</style>
