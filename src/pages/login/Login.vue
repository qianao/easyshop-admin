<template>
  <div class="login_container">
    <div class="title">商城后台管理系统</div>
    <div class="login_box">
      <el-form ref="loginFormRef" label-width="0px" class="login_form">
        <span v-show="isShow" class="err_text">{{err_message}}</span>
        <el-form-item prop="username">
          <el-input v-model="username" prefix-icon="el-icon-user" placeholder="管理员账户"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="password" prefix-icon="el-icon-key" type="password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>

      </el-form>>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      isShow: false,
      err_message: '用户名或密码错误'
    }
  },
  methods: {
    login () {
      if (this.username === 'admin' && this.password === 'admin') { this.$router.push('/main') } else {
        this.isShow = true
      }
    },
    resetLoginForm () {
      this.username = ''
      this.password = ''
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.err_text{
  color: #ff4444;
  margin-left: 10px;
  margin-bottom: 25px;
}
.login_container {
  background-color: #3DB6F3;
  height: 100%;
}
.title{
  position: absolute;
  top: 20%;
  left:42%;
  color: white;
  font-size: 40px;
  font-weight: bold;
}
.login_box {
  width: 600px;
  height: 250px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
