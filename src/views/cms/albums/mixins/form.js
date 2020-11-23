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
      formObj: {
      },
      resource: [], // 上传资源
      formProps: [
        {
          forms: [
            {
              key: 'resource',
              label: '图片',
              slot: true,
              rules: {
                required: true,
                type: 'array',
                message: '请上传图片',
                trigger: 'change'
              }
            },
            {
              key: 'photo_type',
              label: '相片类型',
              type: 'select',
              options: {
                data: [{
                  value: '1',
                  label: '公开'
                }, {
                  value: '2',
                  label: '阅后即焚'
                }]
              },
              rules: {
                required: true,
                message: '请选相片类型',
                trigger: 'change'
              }
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 改变form值
    changeValue(key, value) {
      this.$refs['form'].changeValue(key, value);
    }
  }
};