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
    }
  },
  computed: {
    columns() {
      return [
        {
          type: 'index',
          title: 'ID',
          width: 70,
          indexMethod: row => {
            return row._index + 1 < 10 ? `0${row._index + 1}` : row._index + 1
          }
        },
        {
          title: '用户ID',
          key: 'custom_id'
        },
        {
          title: '用户昵称',
          key: 'nickname'
        },
        {
          title: '消费类型',
          render: (h, params) => {
            const row = params.row
            let renderType
            if (row.income_type) {
              renderType = params.row.income_type === '2' ? '被查看红包视频' : '被查看红包照片'
            }
            if (row.type) {
              renderType = row.type === 'user_chat' ? '被解锁私聊' : '被解锁社交账号'
            }
            if (this.key === '1') {
              renderType = '动态发布'
            }
            if (this.key === '7') {
              renderType = '动态活动'
            }
            return h('span', renderType)
          }
        },
        {
          title: '统计次数',
          key: 'num'
        }
      ]
    }
  }
}
