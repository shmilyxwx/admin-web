/*
 * @Author: fightWz
 * @Date: 2020-05-07 09:05:59
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 10:59:28
 * @Description: 头部注释
 */
export default {
  data() {
    return {
      formObj: {},
      formData: {}
    };
  },
  computed: {
    formProps() {
      return [{
        forms: [{
          key: 'parent_id',
          label: '父级菜单', // 顶级菜单
          type: 'cascader',
          isChange: true,
          span: 22,
          editDisabled: true,
          options: {
            data: [
              ...[{
                value: 0,
                label: '顶级菜单'
              }],
              ...this.menuTreeData
            ]
          }
        }, {
          key: 'is_menu',
          label: '是否菜单',
          type: 'switch',
          editDisabled: true,
          open: '是',
          close: '否',
          span: 22
        }, {
          key: 'title',
          label: '菜单名称',
          span: 22,
          rules: {
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }
        }, {
          key: 'name',
          label: '菜单标识',
          span: 22,
          rules: {
            required: true,
            message: '请输入菜单标识',
            trigger: 'blur'
          }
        },
        {
          key: 'icon',
          label: '菜单图标',
          span: 22
        },
        {
          key: 'path',
          label: '菜单地址',
          span: 22,
          rules: {
            required: true,
            message: '请输入菜单地址',
            trigger: 'blur'
          }
        }, {
          key: 'sort',
          label: '菜单排序',
          type: 'number',
          span: 22,
          rules: {
            required: true,
            type: 'number',
            message: '请输入菜单排序',
            trigger: 'change'
          }
        }]
      }];
    }
  }
};