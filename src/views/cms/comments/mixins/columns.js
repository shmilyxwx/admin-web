/*
 * @Author: fightWz
 * @Date: 2020-05-07 08:59:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-16 16:47:58
 * @Description: 表格列的配置和搜索栏配置
 */
export default {
  data() {
    return {
      searchParams: {
      },
      searchProps: [{
        key: 'search_content',
        placeholder: '输入ID/昵称/手机号',
        label: '用户搜索',
        labelWidth: 80
      },
      {
        key: 'content',
        label: '评论内容'
      },
      {
        key: 'created_at',
        label: '发布时间',
        type: 'date'
      },
      {
        key: 'gender',
        label: '性别',
        type: 'select',
        width: 120,
        clearable: true,
        options: {
          data: [{
            value: 0,
            label: '全部'
          },
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          }
          ]
        }
      }]
    };
  },
  computed: {
    columns() {
      const columns = [
        {
          type: 'index',
          title: '序号',
          width: 70,
          indexMethod: row => {
            return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1;
          }
        }, {
          title: '用户ID',
          key: 'custom_id',
          width: 120
        },
        {
          title: '用户昵称',
          key: 'nickname',
          width: 160
        },
        {
          title: '用户手机号',
          key: 'phone',
          width: 130,
          align: 'center'
        },
        {
          title: '用户性别',
          key: 'gender',
          width: 100,
          align: 'center',
          render(h, params) {
            const row = params.row;
            return h('span', row.gender || '--');
          }
        },
        {
          title: '评论内容',
          minWidth: 350,
          render: (h, params) => {
            const row = params.row;
            if (row.dynamics_comment) {
              return h('span',
                {
                  domProps: {
                    innerHTML: `<span class="success" style="margin-right: 10px">(动态ID：${row.dynamic_id})</span>回复<span style="color: #b7c3d7;margin: 0 5px">${row.dynamics_comment.fname}：</span>${row.content}`
                  }
                }
              );
            }
            return h('span', {
              domProps: {
                innerHTML: `<span class="success" style="margin-right: 10px">(动态ID：${row.dynamic_id})</span>${row.content}`
              }
            });
          }
        },
        {
          title: '点赞数',
          width: 80,
          key: 'zan_count',
          align: 'center'
        },
        {
          title: '发布时间',
          width: 200,
          key: 'created_at'
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          render: (h, params) => {
            const row = params.row;
            return h('div', [
              h('span', {
                class: {
                  error: !row.blacklist_at,
                  disabled: row.blacklist_at
                },
                on: {
                  click: () => {
                    if (row.blacklist_at) {
                      return;
                    }
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定要屏蔽评论信息?',
                      onOk: () => {
                        this.onDel(row);
                      }
                    });
                  }
                }
              }, row.blacklist_at?'已屏蔽':'屏蔽')
            ]);
          }
        }
      ];
      return [...columns];
    }
  }
};
