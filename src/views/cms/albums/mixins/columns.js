/*
 * @Author: fightWz
 * @Date: 2020-05-07 08:59:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-26 11:10:38
 * @Description: 表格列的配置和搜索栏配置
 */
import { putPhotoStatus, putResourcesShield } from '@/request/api';

const types = [
  {
    value: '-111',
    label: '全部'
  },
  {
    value: 1,
    label: '正常',
    color: 'success'
  },
  {
    value: 2,
    label: '阅后即焚',
    color: 'error'
  }
];
const status = [

  {
    value: '-111',
    label: '全部',
    color: 'primary'
  },
  {
    value: '0',
    label: '审核中',
    color: 'primary'
  },
  {
    value: '-1',
    label: '审核未通过',
    color: 'error'
  },
  {
    value: '1',
    label: '通过',
    color: 'success'
  }
];
const types1 = [
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
    label: '语音'
  }
];
export default {
  data() {
    return {
      searchParams: {
        type: '-111',
        status: '-111',
        gender: '-111',
        resource_type: '-111',
        payment_type: '-111'
      }
    };
  },
  computed: {
    searchProps() {
      let arr = [{
        slot: 'keyword'
      },
      {
        key: 'type',
        label: '相册类别',
        type: 'select',
        clearable: true,
        width: 120,
        options: {
          data: types
        }
      },
      {
        key: 'created_at',
        label: '发布时间',
        width: 140,
        type: 'date'
      },
      {
        key: 'status',
        label: '资源状态',
        type: 'select',
        width: 120,
        clearable: true,
        options: {
          data: status
        }
      },
      {
        key: 'payment_type',
        label: '红包类型',
        type: 'select',
        width: 120,
        clearable: true,
        options: {
          data: [{
            value: '-111',
            label: '全部'
          },
          {
            value: '1',
            label: '红包照片'
          },
          {
            value: '2',
            label: '红包视频'
          }
          ]
        }
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
      if (this.$route.params.custom_id) {
        arr.shift();
        arr.pop();
      }
      return arr;
    },
    handleBtns() {
      let handleBtns = [];
      if (this.apiParams['user_type'] === 2 && this.$route.params.custom_id) {
        handleBtns = [{
          text: '添加',
          btnType: 'add'
        }];
      }
      return handleBtns;
    },
    columns() {
      const columns = [
        {
          title: '文件类型',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            const obj = types1.find((v) => {
              return v.value === row.resource[0].resource_type;
            });
            return h('span', obj ? obj.label : '--');
          }
        },
        {
          title: '红包类型',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            return h('span', row.payment_type === 1 ? '红包照片' : row.payment_type === 2 ? '红包视频' : '--');
          }
        },
        {
          title: '图片/视频/音频',
          width: 140,
          render: (h, params) => {
            const row = params.row;
            const resource_type = row.resource && row.resource.length && row.resource[0].resource_type; // 1.图片, 2.视频, 3.音频
            if (resource_type === 1) {
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
                row.resource.map((v) => {
                  return h('img', { attrs: { src: v.path } });
                })
              ]);
            } else if (resource_type === 2) {
              return h('div', {
                style: {
                  margin: '10px 0'
                }
              }, [
                row.resource.map((v) => {
                  return h('pre-video', {
                    props: {
                      isHttp: true,
                      src: v.thumb_path,
                      preSrc: v.path,
                      width: 100,
                      height: 80
                    }
                  });
                })
              ]);
            } else if (resource_type === 3) {
              return h('div', {
                class: {
                  'table-voice': true
                },
                style: {
                  margin: '10px 5px',
                  cursor: 'pointer'
                }
              }, [
                row.resource.map((v) => {
                  return [h('img', {
                    attrs: {
                      src: require('@/assets/images/icon_voice.png')
                    },
                    on: {
                      click: () => {
                        window.open(v.path);
                      }
                    }
                  }), h('span', Math.floor(v.properties['format']['duration']) + 's')];
                })
              ]);
            }
            return h('span', '--');
          }
        },
        {
          title: '资源状态',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            if (String(row.status)) {
              const obj = status.find(v => v.value === String(row.status));
              return h('Tag', {
                props: { color: obj ? obj.color : 'default' }
              }, obj ? obj.label : '--');
            }
            return h('Tag', {
              props: { color: 'success' }
            }, '正常');
          }
        },
        {
          title: '相册类别',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            const obj = types.find(v => v.value === row.type);
            return h('Tag', {
              props: { color: obj ? obj.color : 'default' }
            }, obj ? obj.label : '--');
          }
        },
        {
          title: '发布时间',
          key: 'created_at',
          minWidth: 200
        },
        {
          title: '性别',
          key: 'gender',
          width: 80
        },
        {
          title: '是否红包资源',
          width: 130,
          render: (h, params) => {
            const row = params.row;
            //照片是否红包类型payment_type
            let payment_type_status = Boolean(row.payment_type);
            let change_payment_type_status;
            if (row.resource[0].resource_type === 1) {
              if (row.payment_type) {
                change_payment_type_status = 0;
              } else {
                change_payment_type_status = 1;
              }
            } else if (row.payment_type) {
              change_payment_type_status = 0;
            } else {
              change_payment_type_status = 1;
            }
            return h('div', [
              h('i-switch', {
                props: {
                  disabled: row.user_type === 1 || row.gender === '男' || row.status !== 1,
                  value: payment_type_status,
                  size: 'large',
                  'before-change': () => {
                    return new Promise((resolve) => {
                      this.$Modal.confirm({
                        title: '友情提示',
                        content: '您确定要将该信息设置为红包资源？',
                        onOk: async () => {
                          try {
                            await putPhotoStatus({
                              id: row.id,
                              payment_type: change_payment_type_status
                            });
                            this.getData();
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
                  open: () => h('span', '是'),
                  close: () => h('span', '否')
                }
              })
            ]);
          }
        },
        {
          title: '状态',
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h('div', [
              h('i-switch', {
                props: {
                  value: !row.resource[0].shielded_at,
                  size: 'large',
                  'before-change': () => {
                    return new Promise((resolve) => {
                      this.$Modal.confirm({
                        title: '友情提示',
                        content: '您确认要切换相册状态吗？',
                        onOk: async () => {
                          await putResourcesShield({ id: row.resource[0].id, status: row.resource[0].shielded_at });
                          resolve();
                        }
                      });
                    });
                  }
                },
                scopedSlots: {
                  open: () => h('span', '开启'),
                  close: () => h('span', '屏蔽')
                }
              })
            ]);
          }
        },
        {
          title: '操作',
          minWidth: 130,
          render: (h, params) => {
            const row = params.row;
            let delBtn;
            if (this.$route.meta.user_type !== 1) {
              delBtn = h('span', {
                class: { error: true, disabled: row.real_type },
                on: {
                  click: () => {
                    if (row.real_type) {
                      return false;
                    }
                    this.$Modal.confirm({
                      title: '确认提示',
                      content: '确定删除相册信息?',
                      onOk: () => {
                        this.onDel(row.id);
                      }
                    });
                  }
                }
              }, '删除');
            } else {
              delBtn = '';
            }
            return h('p', [
              h('span', {
                class: { primary: true, disabled: row.status === 1 || row.status === -1 || row.resource[0].resource_type === 1 },
                on: {
                  click: async () => {
                    if (row.status === 1 || row.status === -1 || row.resource[0].resource_type === 1) {
                      return false;
                    }
                    await putPhotoStatus({ id: row.id, status: 1 });
                  }
                }
              }, '审核'),
              h('Divider', { props: { type: 'vertical' } }),
              delBtn
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
      if (!this.custom_id) {
        indexColumns.push({
          title: '用户ID',
          key: 'custom_id',
          width: 120
        },
        {
          title: '用户信息',
          width: 180,
          render: (h, params) => {
            const row = params.row;
            return h('div', {
              style: {
                padding: '5px 0',
                lineHeight: '24px'
              }
            }, [
              h('p', {
                domProps: {
                  innerHTML: `<span style="color: #666">昵称：</span>${row.nickname}`
                }
              }),
              h('p', {
                domProps: {
                  innerHTML: `<span style="color: #666">性别：</span>${row.gender}`
                }
              }),
              h('p', {
                domProps: {
                  innerHTML: `<span style="color: #666">手机号：</span>${row.phone}`
                }
              })
            ]);
          }
        });
      }
      return [...[], ...indexColumns, ...columns];
    }
  }
};
