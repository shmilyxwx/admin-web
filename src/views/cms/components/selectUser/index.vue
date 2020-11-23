<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-10 10:37:37
 * @Description: 用户选择
 -->
<template>
  <div>
    <Modal v-model="porosSanModel" title="点赞" :loading="loading" @on-ok="onZanSubmit" @on-cancel='onCancel' width="450">
      <wz-form v-if="porosSanModel" ref="form" :form-props="formProps" :form-obj="formObj" :label-width="130">
        <template v-slot:user_id="slotProps">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <Select v-model="formObj['user_id']" filterable remote :remote-method="RemoteMethod" :loading="userLoading" @on-change="changeUser">
              <Option v-for="(option, index) in userOptions" :value="`${option.phone}---${option.nickname}---${option.custom_id}`" :key="index">{{option.nickname}}</Option>
            </Select>
          </FormItem>
        </template>
      </wz-form>
    </Modal>
  </div>
</template>
<script>
import form from './mixins/form';
export default {
  mixins: [form],
  props: {
    zanModel: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      default: '男'
    }
  },
  watch: {
    zanModel: {
      deep: true,
      handler(val) {
        this.porosSanModel = val;
      }
    }
  },
  data() {
    return {
      porosSanModel: false,
      loading: true
    };
  },
  methods: {
    changeUser(val) {
      let selectUser = this.userOptions.filter(v => v.custom_id === Number(val.split('---')[2]));
      this.changeValue('user_id', selectUser[0].id);
    },
    async onZanSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        this.formData = { ...validate.data };
        this.$emit('selectUserSure', this.formData.user_id);
      } catch (error) {
        console.log(error.msg || '操作失败');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    },
    initFormObj() {
      this.formObj = { search_type: 1, user_id: '' };
      this.userOptions = [];
      this.$emit('update:zanModel', false);
    },
    onCancel() {
      this.initFormObj();
    }
  }
};
</script>
<style lang="less" scoped>
</style>