<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:44:09
 * @Description: 头部注释
 -->
<template>
  <div class="wrap">
    <wz-table ref="table" :handle-btns="handleBtns" title="广告商列表" :columns="columns" :data-api="dataApi" @handle-click="handleClick" />
    <Modal v-model="editModel" title="添加渠道" :loading="loading" width="480" @on-ok="onSubmit">
      <wz-form v-if="editModel" ref="form" :form-props="formProps" :form-obj="formObj" />
    </Modal>
  </div>
</template>
<script>
import {
  getAdvertiserList,
  putChannelAdvertiser,
  postChannelAdvertiser

} from '@/request/api'
import columns from './mixins/columns'
import form from './mixins/form'
export default {
  mixins: [columns, form],
  data() {
    return {
      dataApi: getAdvertiserList,
      type: null,
      apiParams: {},
      loading: true,
      editModel: false
    }
  },
  mounted() {
    this.getData({ a: '111' })
  },

  methods: {
    // 获取数据
    async getData(params = {}) {
      await this.$refs['table'].getData({ ...this.apiParams, ...params })
    },
    // 重置密码
    async restPwd(row) {
      const res = await putChannelAdvertiser({ id: row.id, reset: 1 })
      this.$Notice.success({
        title: '密码重置成功',
        desc: row.source_type + '新密码为' + res.data,
        duration: 0
      })
      this.getData()
    },
    // 按钮点击事件
    handleClick(type, row = {}) {
      switch (type) {
        case 'add': // 添加
          this.editModel = true
          break
        default:
          break
      }
    },
    // 确定新增、修改
    async onSubmit() {
      try {
        const validate = await this.$refs['form'].validate()
        this.formData = {
          ...validate.data
        }
        const res = await postChannelAdvertiser(this.formData)
        this.editModel = false
        this.$Notice.success({
          title: '创建成功',
          desc: res.data.username + '新密码为' + res.data.password,
          duration: 0
        })
        this.$refs['table'].filterData()
      } catch (error) {
        this.$Message.error(error.msg || '操作失败')
      } finally {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }
    }
  }
}
</script>
