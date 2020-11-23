<!--
 * @Author: fightWz
 * @Date: 2020-04-24 13:07:41
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-21 14:55:45
 * @Description: 头部注释
 -->
<template>
  <div class="login" :style="{ 'background-image': `url(${bg_login})` }">
    <div class="login-con">
      <h2>欢迎登录</h2>
      <Form ref="loginForm" :model="formData" :rules="rules" @keydown.enter.native="onLogin">
        <FormItem prop="userName">
          <Input v-model="formData.userName" prefix="ios-person" placeholder="请输入用户名" />
        </FormItem>
        <FormItem prop="password">
          <Input v-model="formData.password" type="password" prefix="md-lock" password placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" long :loading="loading" @click="onLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg_login: require('@/assets/images/login/bg_login.jpg'),
      formData: {},
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    // 登录
    async onLogin() {
      this.loading = true
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('onLogin', this.formData)
            this.$router.push({ name: 'survey' })
            this.loading = false
          } catch (error) {
            this.loading = false
          }
        }
      })
    },
    // 获取菜单
    async getMenuData() {
      try {
        const res = await this.$store.dispatch('getMenuData')
        if (res.data && res.data.length) {
          this.$Message.success('登录成功')
          const routerName = res.data[0].child && res.data[0].child.length ? res.data[0].child[0].name : res.data[0].name
          this.$router.push({
            name: routerName
          })
        } else {
          this.$Message.error('您没有访问权限，请联系管理员')
        }
      } catch (error) {
        this.$Message.error(error.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  overflow: hidden;
  height: 100vh;
  background-size: cover;
  min-height: 400px;
  &-con{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    background: rgba(255,255,255,0.85);
    padding: 30px;
    border-radius: 10px;
    width: 350px;
    box-shadow: 0 0 10px rgba(0,0,0,0.8);
    h2{
      text-align: center;
      padding: 0 0 20px;
      font-size: 20px;
    }
  }
}
</style>
