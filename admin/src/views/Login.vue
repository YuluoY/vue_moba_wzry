<template>
  <div class="Login-container">
    <el-card header='登录' class="login-card">
      <el-form @submit.native.prevent="preCheck">
        <el-form-item label='用户名'>
          <el-input placeholder='请输入用户名' v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label='密码'>
          <el-input placeholder='请输入密码' v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' native-type='submit'>登录</el-button>
          <el-button type='primary'>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      preCheck() {
        if (this.model.username === '' || this.model.password === '') {
          this.$message({
            type: 'warning',
            message: '小落：请先将表单填完整再点击登录，不要捣乱😡！'
          })
        } else {
          this.login();
        }
      },
      async login() {
        const res = await this.$http.post('/login', this.model);
        localStorage.token = res.data.token; // 登录成功后的token存储
        this.$router.push('/');
        this.$message({
          type: 'success',
          message: '小落：恭喜您，登录成功😚！'
        })
      }
    },
  }
</script>

<style scoped>
  .Login-container {
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-card {
    width: 30rem;
  }
</style>