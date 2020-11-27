/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-21 14:57:59
 * @Description: 头部注释
 */
import { getChannelAPPType } from '@/request/api'

export default {
  data() {
    return {
      formObj: {},
      formData: {},
      appType: []
    }
  },
  computed: {
    formProps() {
      return [
        {
          forms: [
            {
              key: 'type',
              label: '应用',
              type: 'select',
              options: {
                data: this.appType
              },
              rules: {
                required: true,
                message: '请选择应用',
                trigger: 'change'
              }
            },
            {
              key: 'note',
              label: '渠道名称',
              rules: {
                required: true,
                message: '请输入渠道名称',
                trigger: 'blur'
              }
            },
            {
              key: 'source_type',
              label: '渠道编号',
              rules: {
                required: true,
                message: '请输入渠道编号',
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
            }
          ]
        }
      ]
    }
  },
  async created() {
    const res = await getChannelAPPType()
    this.appType = this.$commonJS.converLabel(res.data)
  }
}
