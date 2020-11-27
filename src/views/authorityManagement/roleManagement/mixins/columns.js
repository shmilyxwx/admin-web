/*
 * @Author: fightWz
 * @Date: 2020-05-07 17:14:19
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 13:41:04
 * @Description: 配置
 */
export default {
  data() {
    return {
      handleBtns: [
        {
          text: '添加',
          btnType: 'add'
        }
      ],
      batchBtns: [{
        text: '批量开启',
        btnType: 'batchOpen'
      }, {
        text: '批量禁用',
        btnType: 'batchClose'
      }, {
        text: '批量删除',
        btnType: 'batchDel'
      }, {
        text: '批量导出',
        btnType: 'batchExp'
      }]
    };
  },
  computed: {
    columns() {
      return [
        {
          type: 'index',
          title: 'ID',
          width: 70,
          indexMethod: row => {
            return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1;
          }
        },
        {
          title: '角色名称',
          key: 'title'
        },
        {
          title: '角色标识',
          key: 'name'
        },
        {
          title: '添加时间',
          key: 'created_at'
        },
        {
          title: '操作',
          width: 220,
          render: (h, params) => {
            const row = params.row;
            return h('p', [
              h(
                'span',
                {
                  class: {
                    primary: true
                  },
                  on: {
                    click: () => {
                      this.handleClick('permision', row);
                    }
                  }
                },
                '权限设置'
              ),
              h('Divider', { props: { type: 'vertical' } }),
              h(
                'span',
                {
                  class: {
                    primary: true
                  },
                  on: {
                    click: () => {
                      this.handleClick('edit', row);
                    }
                  }
                },
                '编辑'
              ),
              h('Divider', {
                props: {
                  type: 'vertical'
                }
              }),
              h('span', {
                class: { error: true },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定删除角色信息?',
                      onOk: () => {
                        this.onDel(row.id);
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ];
    }
  }
};