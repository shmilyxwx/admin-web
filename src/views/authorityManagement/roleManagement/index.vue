<!--
 * @Author: fightWz
 * @Date: 2020-05-13 14:42:52
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:43:37
 * @FilePath: \langya-admin\src\views\authorityManagement\roleManagement\index.vue
 * @Description:角色管理
 -->
<template>
  <div class="wrap">
    <wz-table
      title="角色列表"
      ref="table"
      :handle-btns="handleBtns"
      :columns="columns"
      :data-api="dataApi"
      @handle-click="handleClick"
    />
    <Modal v-model="editModel" :title="editTitle" :loading="loading" @on-ok="onSubmit" width="400">
      <wz-form ref="form" :form-props="formProps" :form-obj="formObj" v-if="editModel"></wz-form>
    </Modal>
    <!-- 权限设置 -->
    <Modal
      v-model="editPermision"
      title="权限设置"
      ok-text="确认分配"
      :loading="loading"
      @on-ok="onDistribute"
      width="400"
    >
      <div class="role-permision" v-if="editPermision">
        <Tree :data="menuTree" show-checkbox @on-check-change="onCheckTree"></Tree>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  getAdminRole,
  addAdminRole,
  editAdminRole,
  getMenuList,
  addPermission,
  delAdminRole
} from '@/request/api';
import columns from './mixins/columns';
import form from './mixins/form';
export default {
  mixins: [columns, form],
  data() {
    return {
      dataApi: getAdminRole,
      loading: true,
      editTitle: '新增',
      editModel: false,
      type: null,
      roleData: [],
      apiParams: {},
      editPermision: false,
      menuTree: [],
      checkIds: []
    };
  },
  mounted() {
    this.getData();
    this.getMenuData();
  },
  methods: {
    // 获取数据
    async getData() {
      await this.$refs['table'].getData(this.apiParams);
    },
    // 获取菜单树
    async getMenuData() {
      const res = await getMenuList();
      this.menus = res.data;
      this.menuTree = this.converTree(this.menus, []);
    },
    // 序列化树
    converTree(array = [], ids = []) {
      const res = [];
      array.forEach(v => {
        const { title, id, parent_id } = v;
        const Obj = {
          title,
          id,
          parent_id
        };
        const pids = ids.filter(m => m === id);
        if (ids.length && ids.includes(id)) {
          Obj['checked'] = true;
          Obj['expand'] = true;
        }
        if (v.child.length) {
          Obj.children = this.converTree(v.child, ids);
          if (pids.length < v.child.length + 1) {
            Obj['checked'] = false;
          }
        }
        res.push(Obj);
      });
      return res;
    },
    // 选择菜单
    onCheckTree(e) {
      this.checkIds = e.map(v => v.id);
    },
    // 按钮点击事件
    handleClick(type, row = { }) {
      this.formObj = { ...row };
      switch (type) {
      case 'add': // 添加
        this.editTitle = '新建角色';
        this.editModel = true;
        break;
      case 'edit':
        this.editTitle = '编辑角色';
        this.editModel = true;
        break;
      case 'permision':
        this.getMenuIds(row.id);
        this.editPermision = true;
        break;
      default:
        break;
      }
    },
    // 获取角色菜单id
    async getMenuIds(roleId) {
      this.checkIds = [];
      const res = await getMenuList({
        role_id: roleId
      });
      res.data.forEach(v => {
        this.checkIds.push(v.id);
        if (v.child.length) {
          const ids = v.child.map(m => m.id);
          const pids = v.child.map(m => m.parent_id);
          this.checkIds = [...this.checkIds, ...ids, ...pids];
        }
      });
      this.menuTree = this.converTree(this.menus, this.checkIds);
    },
    getTreeDeepArr(id, treeData) {
      let arr = []; // 在递归时操作的数组
      let returnArr = []; // 存放结果的数组
      let depth = 0; // 定义全局层级
      // 定义递归函数
      function childrenEach(childrenData, depthN) {
        for (let j = 0; j < childrenData.length; j++) {
          depth = depthN; // 将执行的层级赋值 到 全局层级
          arr[depthN] = childrenData[j].id;
          if (childrenData[j].id === id && depth !==0) {
            returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
            break;
          } else if (childrenData[j].child) {
            depth++;
            childrenEach(childrenData[j].child, depth);
          }
        }
        return returnArr;
      }
      return childrenEach(treeData, depth);
    },
    // 确认分配
    async onDistribute() {
      try {
        let ids = [];
        this.checkIds.forEach(v => {
          const menuIds = this.getTreeDeepArr(v, this.menus);
          ids = [...new Set([...ids, ...menuIds, ...[v]])];
        });
        const res = await addPermission({
          id: this.formObj['id'],
          menu: ids.join(',')
        });
        this.$Message.success(res.msg);
        this.loading = false;
        this.checkIds = [];
        this.$nextTick(() => {
          this.loading = true;
          this.editPermision = false;
        });
      } catch (error) {
        this.loading = false;
        this.$Message.error(error.msg || '操作失败');
        this.$nextTick(() => {
          this.loading = true;
        });
      }

    },
    // 确定新增、修改
    async onSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        this.formData = {
          ...validate.data
        };
        if (this.formData.id) {
          await editAdminRole(this.formData);
        } else {
          await addAdminRole(this.formData);
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
        this.$Message.error(error.msg || '操作失败');
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    },
    // 删除
    async onDel(id) {
      try {
        const res = await delAdminRole({id:id});
        this.$Message.success(res.msg);
        this.getData();
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      }
    }
  }
};
</script>

<style lang="less">
.role-permision {
  .search {
    margin-bottom: 20px;
    button {
      margin-left: 20px;
    }
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #333;
    background: none;
  }
  .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    display: none;
  }
  .ivu-menu-vertical .ivu-menu-item,
  .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 10px 20px;
  }
  .ivu-menu {
    margin: 0 auto;
    &-submenu {
      border: 1px solid #eee;
      box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15);
      &-title {
        border-bottom: 1px solid #eee;
      }
      &.ivu-menu-submenu-has-parent-submenu {
        box-shadow: none;
        border: none;
        border-bottom: 1px solid #eee;
        .ivu-menu-submenu-title {
          border: none;
        }
      }
    }
  }
}
</style>