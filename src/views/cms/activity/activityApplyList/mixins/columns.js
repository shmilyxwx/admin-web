/*
 * @Author: fightWz
 * @Date: 2020-05-07 08:59:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-16 17:47:31
 * @Description: 表格列的配置和搜索栏配置
 */

export default {
  data() {
    return {
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
            title: '用户头像',
            width: 100,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              return h('div',
                {
                  class: {
                    'img-personal': true
                  }
                },
                [
                  h('img', {
                    attrs: {
                      src: this.$options.filters.avatar(row.avatar)
                    }
                  })
                ]
              );
            }
          },
          {
            key:'custom_id',
            title: '用户ID：'
          },
          {
            key:'nickname',
            title: '昵称'
          },
          {
            title: '报名时间',
            key:'created_at'
          },
          {
            title: '报名图片',
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
          }
        ]
    };
  }
};