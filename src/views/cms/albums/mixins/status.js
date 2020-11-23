/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-13 13:06:35
 * @Description: 头部注释
 */
export default {
  data() {
    return {
      statusFormObj: {
      }
    };
  },
  computed: {
    statusFormProps() {
      let arr = [
        {
          forms: [
            {
              key: 'status',
              label: '审核状态',
              type: 'select',
              options: {
                data: [{
                  value: '-1',
                  label: '审核不通过',
                  disabled: String(this.rowData && this.rowData.status) === '-1'
                }, {
                  value: '1',
                  label: '审核通过',
                  disabled: String(this.rowData && this.rowData.status) === '1'
                }]
              },
              rules: {
                required: true,
                message: '请选审核状态',
                trigger: 'change'
              }
            }
          ]
        }
      ];
      return arr;
    }

  }
};