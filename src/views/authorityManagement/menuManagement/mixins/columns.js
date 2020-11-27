/*
 * @Author: fightWz
 * @Date: 2020-05-07 17:14:19
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 17:03:24
 * @Description: 配置
 */
export default {
  data() {
    return {
      handleBtns: [{
        text: '新增',
        btnType: 'add'
      }],
      columns: [
        {
          title: '菜单名称',
          minWidth: 300,
          tree: true,
          render(h, params) {
            const row = params.row;
            const titleStr = row.parentId && row.parentId!=='0' ? row.title : `├  ${row.title}`;
            return h('span', titleStr);
          }
        },
        {
          title: '图标',
          width: 100,
          align: 'center',
          render(h, params) {
            const row = params.row;
            if (row.icon) {
              return h('s-icon', {
                props: {
                  name: row.icon,
                  scale: 1.7
                }
              });
            }
            return h('span');
          }
        },
        {
          title: '菜单标识',
          key: 'name',
          width: 250
        },
        {
          title: '路径',
          key: 'path',
          minWidth: 300
        },
        {
          title: '是否菜单',
          align: 'center',
          width: 100,
          render(h, params) {
            const row = params.row;
            return h(
              'Tag',
              {
                props: {
                  color: row.is_menu? 'primary' : 'error'
                }
              },
              row.is_menu?'是':'否'
            );
          }
        },
        {
          title: '排序',
          align: 'center',
          width: 100,
          render(h, params) {
            const row = params.row;
            return h(
              'Tag',
              {
                props: {
                  color: row.sort === 0 ? 'success' : 'cyan'
                }
              },
              row.sort
            );
          }
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
                      this.handleClick('addChildren', row);
                    }
                  }
                },
                '创建子菜单'
              ),
              h('Divider', {
                props: {
                  type: 'vertical'
                }
              }),
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
                '修改'
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
                      content: '确定删除菜单管理信息?',
                      onOk: () => {
                        this.handleClick('del', row);
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  }
};