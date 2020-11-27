/*
 * @Author: fightWz
 * @Date: 2020-05-13 15:01:44
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-03 13:34:41
 * @FilePath: \view-ly-admin\src\views\authorityManagement\roleManagement\mixins\form.js
 * @Description: 角色配置
 */
export default {
  data() {
    return {
      formObj: {
      },
      formData: {},
      formProps: [{
        forms: [{
          key: 'title',
          label: '角色名称',
          maxlength: 15,
          showLimit: true,
          rules: {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        }, {
          key: 'name',
          label: '角色标识',
          maxlength: 15,
          showLimit: true,
          rules: {
            required: true,
            message: '请输入角色标识',
            trigger: 'blur'
          }
        }]
      }]
    };
  }
};