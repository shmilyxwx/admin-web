/*
 * @Author: fightWz
 * @Date: 2020-05-07 17:14:19
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 14:57:09
 * @Description: 配置
 */
import {
  editAdminUser
} from '@/request/api'
export default {
  data() {
    return {
      searchParams: {
        status: '-111'
      },
      searchProps: [
        {
          key: 'username',
          label: '账号'
        },
        {
          key: 'status',
          label: '账号状态',
          type: 'select',
          clearable: true,
          options: {
            data: [{
              label: '全部',
              value: '-111'
            }, {
              label: '开启',
              value: '1'
            }, {
              label: '禁用',
              value: '0'
            }]
          }
        }
      ],
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
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'username'
        },
        {
          title: '角色',
          minWidth: 140,
          render: (h, params) => {
            const row = params.row
            return h('span', (row.assigned_role.length && row.assigned_role[0].title) || '--')
          }
        },
        {
          title: '添加时间',
          key: 'created_at',
          width: 170
        },
        {
          title: '状态',
          align: 'center',
          width: 120,
          render: (h, params) => {
            const row = params.row
            return h('i-switch', {
              props: {
                value: row.status === 1
              },
              on: {
                'on-change': async() => {
                  await editAdminUser({ id: row.id, status: row.status === 1 ? 0 : 1 })
                }
              }
            })
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          render: (h, params) => {
            const row = params.row
            return h('div', [
              h('span', {
                class: { primary: true },
                on: {
                  click: () => {
                    this.handleClick('password', row)
                  }
                }
              }, '修改密码'),
              h('Divider', { props: { type: 'vertical' }}),
              h('span', {
                class: { primary: true },
                on: {
                  click: () => {
                    this.handleClick('edit', row)
                  }
                }
              }, '编辑'),
              h('Divider', { props: { type: 'vertical' }}),
              h('span', {
                class: { error: true },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定删除用户管理信息?',
                      onOk: () => {
                        this.onDel(row.id)
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
      return columns
    }
  }
}
