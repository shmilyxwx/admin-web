<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:44:09
 * @Description: 头部注释
 -->
<template>
  <div class="wrap">
    <search-table :search-props="searchProps" :search-params="searchParams" @handle-filter="handleFilter" />
    <wz-table ref="table" title="管理员用户" :handle-btns="handleBtns" :columns="columns" :data-api="dataApi" @handle-click="handleClick" />
    <Modal v-model="editModel" :title="editTitle" :loading="loading" width="480" @on-ok="onSubmit">
      <wz-form v-if="editModel" ref="form" :form-props="formProps" :form-obj="formObj" />
    </Modal>
  </div>
</template>
<script>
import {
  getAdminUser,
  addAdminUser,
  editAdminUser,
  delAdminUser,
  getAdminRole,
  editAssignedRole
} from '@/request/api'
import columns from './mixins/columns'
import form from './mixins/form'
export default {
  mixins: [columns, form],
  data() {
    return {
      dataApi: getAdminUser,
      loading: true,
      editTitle: '新增',
      editModel: false,
      type: null,
      roleData: [],
      apiParams: {}
    }
  },
  mounted() {
    this.getData()
    this.getRoleData()
  },
  methods: {
    // 获取数据
    async getData() {
      await this.$refs['table'].getData(this.apiParams)
    },
    // 搜索
    handleFilter(params) {
      this.apiParams = {
        ...this.apiParams,
        ...params
      }
      this.$refs['table'].filterData(this.apiParams)
    },
    // 获取角色列表
    async getRoleData() {
      const res = await getAdminRole({
        page: 1,
        page_size: 1000
      })
      this.roleData = res.data.data.map(v => {
        return {
          label: v.title,
          value: v.id
        }
      })
    },
    // 按钮点击事件
    handleClick(type, row = { status: 1 }) {
      this.formObj = { ...row }
      this.type = type
      switch (type) {
        case 'add': // 添加
          this.editTitle = '新建用户'
          this.editModel = true
          break
        case 'password': // 修改密码
          this.editTitle = '修改密码'
          this.editModel = true
          break
        case 'edit':
          this.editTitle = '编辑角色'
          this.formObj['disabled'] = true
          this.formObj['role'] = (this.formObj['assigned_role'].length && this.formObj['assigned_role'][0].role_id) || ''
          this.editModel = true
          break
        default:
          break
      }
    },
    // 删除
    async onDel(id) {
      await delAdminUser({ id: id })
      this.getData()
    },
    // 确定新增、修改
    async onSubmit() {
      try {
        const validate = await this.$refs['form'].validate()
        this.formData = {
          ...validate.data
        }
        if (this.formData.id && this.type === 'password') {
          await editAdminUser({
            id: this.formData['id'],
            password: this.formData['password']
          })
        } else if (this.formData.id && this.type === 'edit') {
          await editAssignedRole({
            id: this.formData['id'],
            role: this.formData['role']
          })
        } else {
          await addAdminUser(this.formData)
        }
        this.loading = false
        this.$Message.success('操作成功')
        this.$nextTick(() => {
          this.loading = true
          this.editModel = false
        })
        this.getData()
      } catch (error) {
        this.loading = false
        this.$Message.error(error.msg || '操作失败')
        this.$nextTick(() => {
          this.loading = true
        })
      }
    }
  }
}
</script>
