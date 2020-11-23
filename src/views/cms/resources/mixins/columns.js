/*
 * @Author: fightWz
 * @Date: 2020-05-07 08:59:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-27 17:27:11
 * @Description: 表格列的配置和搜索栏配置
 */
import { putResourcesShield } from '@/request/api';
const resource_type = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '图片'
  },
  {
    value: 2,
    label: '视频'
  },
  {
    value: 3,
    label: '音频'
  }
];
const origin_type = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '活动'
  },
  {
    value: 2,
    label: '动态'
  },
  {
    value: 3,
    label: '相册'
  }
];

export default {
  data() {
    return {
      searchParams: {
        origin_type: 0,
        resource_type: 0
      }
    };
  },
  computed: {
    searchProps() {
      let arr = [{
        key: 'search_content',
        placeholder: '输入ID/昵称/手机号',
        label: '用户搜索',
        labelWidth: 80
      },
      {
        key: 'resource_type',
        label: '文件类型',
        type: 'select',
        clearable: true,
        width: 120,
        options: {
          data: resource_type
        }
      },
      {
        key: 'origin_type',
        label: '资源来源',
        type: 'select',
        clearable: true,
        width: 120,
        options: {
          data: origin_type
        }
      },
      {
        key: 'created_at',
        label: '发布时间',
        width: 140,
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
            value: '-111',
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
      }
      ];
      return arr;
    },
    columns() {
      const columns = [
        {
          title: '文件类型',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            const obj = resource_type.find((v) => {
              return v.value === row.resource_type;
            });
            return h('span', obj ? obj.label : '--');
          }
        },
        {
          title: '图片/视频/音频',
          key: 'content',
          width: 140,
          render: (h, params) => {
            const row = params.row;
            const row_resource_type = row.resource_type; // 1.图片, 2.视频, 3.音频
            let photoDesc;
            if (row.user_info) {
              photoDesc = row.user_info.photo_real_type === 1 ? '真人' : row.user_info.photo_real_type === 2 ? '女神' : '';
            }
            if (row_resource_type === 1) {
              return h('div', {
                class: {
                  'table-img': true
                },
                directives: [{
                  name: 'viewer',
                  modifiers: {
                    bar: true
                  }
                }]
              }, [
                h('img', { attrs: { src: row.path } }),
                h('div', {
                  class: {
                    'img-more': true,
                    'show': true
                  }
                }, photoDesc)
              ]);
            } else if (row_resource_type === 2) {
              return h('div', {
                style: {
                  margin: '10px 0'
                }
              }, [
                h('pre-video', {
                  props: {
                    isHttp: true,
                    src: row.thumb_path,
                    preSrc: row.path,
                    width: 100,
                    height: 80
                  }
                })
              ]);
            } else if (row_resource_type === 3) {
              return h('div', {
                class: {
                  'table-voice': true
                },
                style: {
                  margin: '10px 5px',
                  cursor: 'pointer'
                }
              }, [
                [h('img', {
                  attrs: {
                    src: require('@/assets/images/icon_voice.png')
                  },
                  on: {
                    click: () => {
                      window.open(row.path);
                    }
                  }
                }), h('span', Math.floor(row.properties['format']['duration']) + 's')]
              ]);
            }
            return h('span', '--');
          }
        },
        {
          title: '资源来源',
          minWidth: 120,
          key: '',
          render: (h, params) => {
            const row = params.row;
            const obj = origin_type.find((v) => {
              return v.value === row.origin_type_desc;
            });
            return h('span', obj ? obj.label : '--');
          }
        },
        {
          title: '发布时间',
          key: 'created_at',
          minWidth: 200
        },
        {
          title: '状态',
          width: 130,
          render: (h, params) => {
            const row = params.row;
            return h('div', [
              h('i-switch', {
                props: {
                  value: Boolean(!params.row.shielded_at),
                  size: 'large',
                  'before-change': () => {
                    return new Promise((resolve) => {
                      this.$Modal.confirm({
                        title: '友情提示',
                        content: '您确定要改变状态？',
                        onOk: async () => {
                          try {
                            await putResourcesShield({ id: row.id });
                            resolve();
                          } catch (error) {
                            this.$Message.error(error.msg || '操作失败');
                          }
                        }
                      });
                    });
                  }
                },
                scopedSlots: {
                  open: () => h('span', '开'),
                  close: () => h('span', '关')
                }
              })
            ]);
          }
        }
      ];
      const indexColumns = [{
        type: 'index',
        title: '序号',
        width: 70,
        indexMethod: row => {
          return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1;
        }
      }];
      indexColumns.push({
        title: '用户ID',
        width: 120,
        render: (h, params) => {
          const row = params.row;
          return h('span', row.user_info.custom_id || '');
        }
      },
      {
        title: '用户昵称',
        width: 120,
        render: (h, params) => {
          const row = params.row;
          return h('span', row.user_info.nickname || '');
        }
      }
      , {
        title: '性别',
        width: 80,
        render: (h, params) => {
          const row = params.row;
          return h('span', row.user_info.gender || '');
        }
      });
      return [...[], ...indexColumns, ...columns];
    }
  }
};
