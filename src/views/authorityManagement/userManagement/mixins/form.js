/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-21 14:57:59
 * @Description: 头部注释
 */
export default {
  data() {
    return {
      formObj: {},
      formData: {}
    }
  },
  computed: {
    formProps() {
      let formPassword = []
      let forms = []
      if (this.type !== 'edit') {
        formPassword = [{
          key: 'password',
          label: '用户密码',
          type: 'password',
          maxlength: 20,
          rules: [
            {
              required: true,
              message: '用户密码不能为空！',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                this.new_password = value
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
              validator: (rule, value, callback) => {
                if (!this.$validate.isSame(value, this.new_password)) {
                  return callback(new Error('两次输入的密码不匹配！'))
                }
                callback()
              }
            }
          ]
        }]
      }
      if (this.type !== 'password') {
        forms = [...[{
          key: 'name',
          label: '姓名',
          editDisabled: true,
          rules: {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        }, {
          key: 'username',
          label: '账号',
          editDisabled: true,
          rules: {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        }], ...formPassword, ...[{
          key: 'role',
          label: '角色选择',
          type: 'select',
          options: {
            data: this.roleData
          }
        }]]
      } else {
        forms = [...formPassword]
      }
      if (this.type === 'add') {
        forms.pop()
      }
      return [{
        forms: forms
      }]
    }
  },
  created() {
  },
  methods: {
    // 修改form组件值
    changeValue(key, value) {
      this.$refs['form'].changeValue(key, value)
    }
  }
}
