<template>
  <div class="verificationCodeLogin">
    <span class="loginTitle">登录</span>
    <van-form>
      <van-field
        v-model="user.name"
        placeholder="请输入十一位数组"
        type="number"
        :maxlength="maxPhoneLen"
        :rules="[{ required: false, message: '手机号必填' }]"
      />
      <van-field
        class="code"
        v-model="user.code"
        type="number"
        placeholder="请输入验证码"
        :disabled="countDownDis"
        :maxlength="maxCodeLen"
        :rules="[{ required: false, message: '验证码必填' }]"
      >
        <template #button>
          <van-button size="small" plain type="info" :disabled="countDownDis" @click="getCode">{{
            codeButtonTXT
          }}</van-button>
        </template>
      </van-field>
      <div class="bottomButton">
        <van-button round block type="info" :disabled="loginDis" @click="onSubmit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import LogoImg from '@/assets/images/logo.png'
import { countdown } from '@/utils/dynamic/countdown'
export default {
  name: 'verificationCodeLogin',
  data() {
    return {
      LogoImg,
      user: {
        name: '',
        code: ''
      },
      maxPhoneLen: 11,
      maxCodeLen: 8,
      counts: 0
    }
  },
  computed: {
    countDownDis() {
      return !this.user.name || this.user.name.length !== this.maxPhoneLen
    },
    loginDis() {
      return !this.user.code || this.user.code.length !== this.maxCodeLen
    },
    isGetCode() {
      return this.counts !== 0
    },
    codeButtonTXT() {
      return this.isGetCode ? `${this.counts}秒重新获取` : '发送验证码'
    }
  },
  created() {},
  methods: {
    countdown,
    getCode() {
      if (!this.isGetCode) {
        this.counts = 60
        this.countdown('counts', this)
      }
    },
    onSubmit(values) {
      this.$router.replace('home')
    }
  }
}
</script>
<style lang="scss" scoped>
.verificationCodeLogin {
  background: #fff;
  width: 100vw;
  height: 100vh;
  padding: 7px;
  box-sizing: border-box;
  .loginTitle {
    color: rgb(0, 0, 0);
    font-size: 20px;
    font-weight: 600;
    height: 55px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  }
  /deep/ .van-image {
    margin: 60px 196px 60px 16px;
  }
  /deep/ .van-cell__title {
    display: none;
  }
  /deep/ .van-field {
    margin-bottom: 10px;
  }
  .code {
    /deep/ .van-button--info {
      border: 1px solid transparent !important;
      color: #387bff;
      background-color: #fff !important;
    }
    /deep/ .van-button--disabled {
      color: #b2b2b2;
    }
  }
}
</style>
