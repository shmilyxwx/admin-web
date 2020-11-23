/*
 * @Author: fightWz
 * @Date: 2020-05-07 17:14:19
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 14:57:09
 * @Description: 配置
 */
import {
  delChannelAdvertiser
} from '@/request/api'
const type = {
  1: '浪呀',
  4: '鸡冻',
  5: '友约'
}

export default {
  data() {
    return {
      handleBtns: [
        {
          text: '添加',
          btnType: 'add'
        }
      ]
    }
  },
  computed: {
    columns() {
      const columns = [
        {
          type: 'index',
          title: 'ID',
          width: 70,
          indexMethod: row => {
            return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1
          }
        },
        {
          title: '应用',
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h('span', type[row.type])

            ])
          }
        },
        {
          title: '渠道名称',
          key: 'note'
        },
        {
          title: '渠道编号',
          key: 'source_type'
        },
        {
          title: '账号',
          key: 'username'
        },
        {
          title: '添加时间',
          key: 'created_at'
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h('span', {
                class: { error: true },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定删除用户管理信息?',
                      onOk: async() => {
                        await delChannelAdvertiser({ id: row.id })
                        this.getData()
                      }
                    })
                  }
                }
              }, '删除'),
              h('Divider', { props: { type: 'vertical' }}),
              h('span', {
                class: { error: true },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定重置账户密码?',
                      onOk: () => {
                        this.restPwd(row)
                      }
                    })
                  }
                }
              }, '重置密码')
            ])
          }
        }
      ]
      return columns
    }
  }
}
