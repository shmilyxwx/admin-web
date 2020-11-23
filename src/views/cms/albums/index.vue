<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-12 19:45:19
 * @Description: 相册审核
 -->
<template>
  <div class="wrap">
    <search-table ref="search" :search-props="searchProps" :search-params="searchParams" @handle-filter="handleFilter">
      <template v-slot:keyword>
        <Input v-model="apiParams['search_content']" placeholder="输入搜索关键词">
        <Select v-model="apiParams['search_type']" slot="prepend" style="width: 100px">
          <Option value="1">用户ID</Option>
          <Option value="2">用户昵称</Option>
          <Option value="3">手机号码</Option>
        </Select>
        </Input>
      </template>
    </search-table>
    <wz-table :handle-btns="handleBtns" @handle-click="handleClick" ref="table" :columns="columns" :data-api="dataApi" />
    <!-- 表单添加相册 -->
    <Modal v-model="editModel" title="添加相片" :loading="loading" @on-cancel='onCancel' @on-ok="onSubmit" width="800">
      <wz-form ref="form" :form-props="formProps" :form-obj="formObj" :label-width="130" v-if="editModel">
        <!-- 上传图片、视频、音频 -->
        <template v-slot:resource="slotProps">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <Upload ref="upload" :action="$config['uploadUrl']" :data="uploadData" :accept="accept" :format="format" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleUpload" :on-success="handleSuccess" :on-remove="handleRemove">
              <Button icon="ios-cloud-upload-outline" :disabled="resource.length >= fileSize">上传</Button>
            </Upload>
          </FormItem>
        </template>
      </wz-form>
    </Modal>
  </div>
</template>
<script>
import { getPhotoList, delPhoto, addPhoto } from '@/request/api';
import columns from './mixins/columns';
import upload from './mixins/upload';
import form from './mixins/form';
import status from './mixins/status';
export default {
  mixins: [columns, upload, form, status],
  data() {
    return {
      dataApi: getPhotoList,
      custom_id: '',
      apiParams: {
        search_type: '1',
        user_type: 2
      },
      editModel: false,
      loading: true,
      rowData: ''
    };
  },
  mounted() {
    // type 1是真实用用，2虚拟用户
    this.apiParams['user_type'] = this.$route.meta.user_type;
    // 单个用户动态
    this.custom_id = this.$route.params.custom_id;
    this.user_id = this.$route.params.user_id;
    if (this.custom_id) {
      this.apiParams['search_type'] = 1;
      this.apiParams['search_content'] = this.custom_id;
      this.apiParams['user_type'] = this.$route.meta.user_type;
    }
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      console.log(this.apiParams);
      this.$refs['table'].getData(this.apiParams);
    },
    // 搜索
    handleFilter(params, type) {
      if (type === 'reset') {
        this.apiParams = {
          search_type: 1,
          search_content: this.custom_id,
          user_type: Number(this.$route.query.type)
        };
      }
      this.apiParams = { ...this.apiParams, ...params };
      this.$refs['table'].filterData(this.apiParams);
    },
    // 删除
    async onDel(id) {
      try {
        const res = await delPhoto({ id: id });
        this.$Message.success(res.msg);
        this.getData();
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      }
    },
    initForm() {
      this.resource = [];
      this.accept = '';
      this.fileSize = 1;
      this.format = [];
    },
    async onSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        this.formData = { ...validate.data, ...{} };
        this.formData.resource.forEach(v => {
          v.photo_type = this.formData.photo_type;
          v.key = v.path;
          v.resource_type = v.type;
        });
        delete this.formData['photo_type'];
        const res = await addPhoto({
          user_id: this.user_id,
          ...this.formData
        });
        this.$Message.success(res.msg);
        this.editModel = false;
        this.initForm();
        this.getData();
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    },
    onCancel() {
      this.initForm();
    },
    // 按钮点击事件
    handleClick(type, row = {}) {
      this.rowData = row;
      switch (type) {
      case 'add': // 添加
        this.editModel = true;
        break;
      default:
        break;
      }
    }
  },
  watch: {
    $route(newValue) {
      this.apiParams['user_type'] = newValue.meta.type;
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
</style>