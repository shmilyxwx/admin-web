/*
 * @Author: fightWz
 * @Date: 2020-05-07 08:59:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-27 17:28:35
 * @Description: 表格列的配置和搜索栏配置
 */
import { delActivities, putActivities } from '@/request/api';

export default {
  data() {
    return {
      searchParams: {
        is_effective: '-111'
      },
      columns:
        [
          {
            type: 'index',
            title: '序号',
            width: 70,
            indexMethod: row => {
              return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1;
            }
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
                    innerHTML: `<span style="color: #666">用户ID：</span>${row.custom_id}`
                  }
                }),
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
          },
          {
            title: '活动信息',
            minWidth: 200,
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
                    innerHTML: `<span style="color: #666">活动主题：</span>${row.theme || '--'}`
                  }
                }),
                h('p', {
                  domProps: {
                    innerHTML: `<span style="color: #666">活动日期：</span>${row.activity_date || '随时'}(${row.section})`
                  }
                }),
                h('p', {
                  domProps: {
                    innerHTML: `<span style="color: #666">活动地址：</span>${row.location || '--'}`
                  }
                })
              ]);
            }
          },
          {
            title: '期望对象',
            width: 150,
            render: (h, params) => {
              const row = params.row;
              // 期望对象
              let expect = '--';
              if (row.expect_list && row.expect_list.length) {
                expect = row.expect_list.join('/');
              }
              return h('span', expect);
            }
          },
          {
            title: '配图',
            key: 'content',
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
                  }),
                  h('div', {
                    class: {
                      'img-more': true,
                      'show': row.resource.length > 1
                    }
                  }, `+${row.resource.length}`)
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
            title: '补充说明',
            minWidth: 200,
            key: 'instruction'
          },
          {
            title: '发布时间',
            key: 'created_at',
            width: 180
          },
          {
            title: '报名人数',
            key: 'comment_count',
            align: 'center',
            width: 95,
            render: (h, params) => {
              const row = params.row;
              return h('span', {
                class: {
                  primary: true
                },
                on: {
                  click: () => {
                    this.applyDrawer = true;
                    this.$refs['applyTable'].getData({
                      activity_id: row.id
                    });
                  }
                }
              }, row.activity_log_count);
            }
          },
          {
            title: '活动状态',
            width: 130,
            render: (h, params) => {
              const row = params.row;
              let activeStatus;
              if (!row.is_effective) {
                activeStatus = false;
              } else {
                activeStatus = !row.closed_at;
              }
              return h('span', {
                class: {
                  disabled: !activeStatus,
                  primary: activeStatus
                }
              }, activeStatus ? '进行中' : '已关闭');
            }
          },
          {
            title: '操作',
            width: 120,
            render: (h, params) => {
              const row = params.row;
              let activeStatus;
              if (!row.is_effective) {
                activeStatus = false;
              } else {
                activeStatus = !row.closed_at;
              }
              return h('p', [
                h('span', {
                  class: { error: activeStatus, disabled: !activeStatus },
                  on: {
                    click: () => {
                      if (!activeStatus) {
                        return false;
                      }
                      this.$Modal.confirm({
                        title: '确认提示',
                        content: '确定关闭活动吗?',
                        onOk: async () => {
                          await putActivities({ id: row.id });
                          this.getData();
                        }
                      });
                    }
                  }
                }, '关闭'),
                h('Divider', { props: { type: 'vertical' } }),
                h('span', {
                  class: { error: true },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确认提示',
                        content: '确定删除活动信息?',
                        onOk: async () => {
                          await delActivities({ id: row.id });
                          this.getData();
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
        key: 'instruction',
        label: '活动内容'
      },
      {
        key: 'search_time',
        label: '发布时间',
        type: 'date'
      },
      {
        key: 'is_effective',
        label: '活动状态',
        type: 'select',
        width: 100,
        clearable: true,
        labelWidth: 100,
        options: {
          data: [
            {
              value: '-111',
              label: '全部'
            },
            {
              value: '1',
              label: '进行中'
            },
            {
              value: '0',
              label: '已关闭'
            }
          ]
        }
      }
      ];
      if (this.$route.params.custom_id) {
        arr.shift();
      }
      return arr;
    },
    handleBtns() {
      let arr = [
        {
          text: '添加',
          btnType: 'add'
        }
      ];
      console.log(this.$route);
      if (this.$route.params.custom_id && this.$route.meta.user_type ===2) {
        return arr;
      }
      arr.shift();
      return arr;
    }

  }
};