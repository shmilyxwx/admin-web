<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 18:10:33
 * @Description: 菜单管理
 -->
<template>
  <div class="wrap">
    <Card title="菜单管理" style="width:100%" class="table-card">
      <div class="btn" slot="extra">
        <!-- 操作按钮 -->
        <Button
          :type="item.type || 'primary'"
          v-for="(item, index) in handleBtns"
          :key="index"
          style="margin-left: 10px"
          @click="handleClick(item.btnType)"
        >
          <i style="margin-right:5px">
            <s-icon :name="item.icon" scale="1.5" v-if="item.icon" />
          </i>
          {{item.text}}
        </Button>
      </div>
      <Table :columns="columns" :data="tableData" :indent-size="5" row-key="id" border></Table>
    </Card>
    <Modal v-model="editModel" :title="editTitle" :loading="loading" @on-ok="onSubmit" width="450">
      <wz-form ref="form" :form-props="formProps" :form-obj="formObj" v-if="editModel" />
    </Modal>
  </div>
</template>
<script>
import columns from './mixins/columns';
import form from './mixins/form';
import { getMenuList, addAdminMenu, editAdminMenu, delAdminMenu } from '@/request/api';
export default {
  mixins: [columns, form],
  data() {
    return {
      tableData: [],
      editModel: false,
      editTitle: '编辑',
      loading: true,
      menuTreeData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取菜单数据
    async getData() {
      const res = await getMenuList();
      this.tableData = res.data.map(v => {
        return {
          ...v,
          ...{
            children: v.child || [],
            _showChildren: false
          }
        };
      });
      // 表单父级菜单选择为label 和value
      this.menuTreeData = this.$converTreeLabel(this.tableData, 'title', 'id');
    },
    // 操作按钮
    handleClick(type, row = { parent_id: [], sort: 1, is_menu: 0 }) {
      this.formObj = {...row};
      let pids = [];
      switch (type) {
      case 'add': // 新增
        this.editModel = true;
        break;
      case 'addChildren': // 创建子菜单
        this.editTitle = '创建子菜单';
        this.getPids(this.tableData, row.id);
        pids = this.getPids(this.tableData, row.id);
        this.formObj = { ...{sort: 1, is_menu: 0 }, ...{ parent_id: pids } };
        this.editModel = true;
        break;
      case 'edit': // 修改
        this.editTitle = '修改';
        this.getPids(this.tableData, row.id);
        pids = this.getPids(this.tableData, row.id);
        pids.pop();
        if (!pids.length) {
          pids.unshift(0);
        }
        this.formObj = {
          ...row,
          ...{ parent_id: pids, is_menu: row.is_menu === 1 }
        };
        this.editModel = true;
        break;
      case 'del':
        this.onDel(row.id);
        break;
      default:
        break;
      }
    },
    // 获取父级ids集合
    getPids(data, id) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (id === item.id) {
          return [item.id];
        }
        if (item.children) {
          const ids = this.getPids(item.children, id);
          if (ids) {
            return [...[item.id], ...ids];
          }
        }
      }
    },
    // 按钮确定
    async onSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        const { parent_id, is_menu } = validate.data;
        this.formData = {
          ...validate.data,
          ...{
            parent_id: parent_id[parent_id.length - 1],
            is_menu: is_menu ? 1 : 0
          }
        };
        if (this.formData.id) {
          await editAdminMenu(this.formData);
        } else {
          await addAdminMenu(this.formData);
        }
        this.loading = false;
        this.$Message.success('操作成功');
        this.$nextTick(() => {
          this.loading = true;
          this.editModel = false;
        });
        this.getData();
      } catch (error) {
        this.loading = false;
        this.$Message.error('操作失败');
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    },
    // 删除
    async onDel(id) {
      try {
        await delAdminMenu({ id: id });
        this.$Message.success('删除成功');
        this.getData();
      } catch (error) {
        this.$Message.error('删除失败');
      }
    }
  }
};
</script>