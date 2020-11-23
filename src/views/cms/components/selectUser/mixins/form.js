/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-13 13:06:35
 * @Description: 头部注释
 */
import { getUserList } from '@/request/api';

export default {
  data() {
    return {
      userLoading: false,
      userOptions: [],
      formObj: {
        search_type: 1,
        user_id: ''
      },
      formData: {},
      formProps: [
        {
          forms: [
            {
              key: 'search_type',
              label: '搜索类型',
              type: 'select',
              width: 120,
              options: {
                data: [
                  {
                    value: 1,
                    label: '用户ID'
                  },
                  {
                    value: 2,
                    label: '用户昵称'
                  },
                  {
                    value: 3,
                    label: '用户手机号'
                  }
                ]
              },
              rules: [
                {
                  required: true,
                  message: '请选择搜索类型',
                  trigger: 'change',
                  type: 'number'
                },
                {
                  validator: (rule, value, callback) => {
                    this.formObj.search_type = value;
                    callback();
                  }
                }
              ]
            },
            {
              key: 'user_id',
              label: '用户',
              slot: true,
              rules: {
                required: true,
                message: '请选择用户',
                trigger: 'change',
                type: 'number'
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
    },
    async RemoteMethod(query) {
      if (query !== '') {
        this.userLoading = true;
        let params = {
          type: 2,
          search_content: query,
          search_type: this.formObj.search_type,
          page: 1,
          gender: this.gender
        };
        const res = await getUserList(params);
        this.userOptions = res.data.data;
        this.userLoading = false;
      } else {
        this.userOptions = [];
      }
    }
  }
};