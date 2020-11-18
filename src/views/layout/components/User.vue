<!--
 * @Author: fightWz
 * @Date: 2020-04-27 14:19:02
 * @LastEditors: fightWz
 * @LastEditTime: 2020-10-21 10:46:28
 * @Description: 用户
 -->
<template>
  <div :class="['user-' + $config.theme['header_theme'], 'user']">
    <Dropdown @on-click="handleClick">
      <Badge>
        <Avatar style="background-color: #87d068" icon="ios-person" />
      </Badge>
      <span class="name">{{ $store.getters.userInfo.name }}</span>
      <Icon color="#333" :size="18" type="md-arrow-dropdown" style="margin-left: 10px;" />
      <DropdownMenu slot="list">
        <DropdownItem name="changePassword">修改密码</DropdownItem>
        <DropdownItem name="logout">退出系统</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <!-- 修改密码弹框 -->
    <Modal v-model="showModal" :loading="modalLoading" title="修改密码" width="450" @on-ok="okPassword">
      <wz-form v-if="showModal" ref="form" :form-props="formProps" />
    </Modal>
    <!-- 退出登录 -->
    <Modal v-model="modelLogOut" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle" />
        <span>退出确认</span>
      </p>
      <div style="text-align:center">
        <p>点击确认按钮后将返回到登录页面</p>
        <p>是否确定要退出登录?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="out_loading" @click="onLogOut">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { editPassword } from '@/request/api'
export default {
  data() {
    return {
      userAvator: '',
      showModal: false,
      modalLoading: true,
      formProps: [{
        forms: [{
          key: 'old_password',
          label: '旧密码',
          type: 'password',
          maxlength: 20,
          rules: [
            {
              required: true,
              message: '旧密码不能为空！',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '请输入6-20位密码！',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                this.old_password = value
                if (value === this.password) {
                  return callback(new Error('新密码与旧密码相同！'))
                }
                callback()
              }
            }
          ]
        }, {
          key: 'password',
          label: '新密码',
          type: 'password',
          maxlength: 20,
          rules: [
            {
              required: true,
              message: '新密码不能为空！',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '请输入6-20位密码！',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                this.password = value
                if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/.test(value)) {
                  return callback(new Error('密码必须是数字字母组合！'))
                }
                callback()
              }
            },
            {
              validator: (rule, value, callback) => {
                this.password = value
                if (value === this.old_password) {
                  return callback(new Error('新密码与旧密码相同！'))
                }
                callback()
              }
            }
          ]
        }, {
          key: 'password_confirmation',
          label: '确认密码',
          type: 'password',
          maxlength: 20,
          rules: [
            {
              required: true,
              message: '确认密码不能为空！',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '请输入6-20位密码！',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (!this.$validate.isSame(value, this.password)) {
                  return callback(new Error('两次输入的密码不匹配！'))
                }
                callback()
              }
            }
          ]
        }]
      }],
      modelLogOut: false,
      out_loading: false
    }
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case 'changePassword':// 修改密码
          this.showModal = true
          break
        case 'logout':// 退出登录
          this.modelLogOut = true
          break
        default:
          break
      }
    },
    // 确定修改密码
    async okPassword() {
      try {
        const validate = await this.$refs['form'].validate()
        this.formData = { ...validate.data, ...{}}
        await editPassword(this.formData)
        this.modalLoading = false
        this.showModal = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
        this.$Message.success('密码修改成功')
      } catch (error) {
        this.$Message.error(error.msg || '密码修改失败')
        this.modalLoading = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
      }
    },
    // 确定退出
    async onLogOut() {
      this.out_loading = true
      this.$store.commit('set_chatToken', [])
      this.$store.commit('set_menuNames', [])
      this.$store.commit('set_token', '')
      this.$store.commit('set_chatIds', [])
      this.$store.commit('set_chatMsgs', [])
      await this.$store.dispatch('onLogOut')
      this.$nextTick(() => {
        this.out_loading = false
        this.$router.replace('/login')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user{
  cursor: pointer;
  .name{
    color: #fff;
    margin: 0 5px;
  }
  &-light{
    .name{
      color: #333;
    }
  }
}
</style>
