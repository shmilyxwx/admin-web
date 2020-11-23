<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-10 10:37:37
 * @Description: 用户选择
 -->
<template>
  <div>
    <Modal v-model="porosActivityModel" title="活动" :loading="loading" @on-ok="onAcitveSubmit" @on-cancel='onCancel' width="650">
      <wz-form v-if="porosActivityModel" ref="form" :form-props="formProps" :form-obj="formObj" :label-width="130">
        <!-- 上传图片、视频、音频 -->
        <template v-slot:resource="slotProps">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <Upload ref="upload" :action="$config['uploadUrl']" :data="uploadData" :accept="accept" :format="format" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleUpload" :on-success="handleSuccess" :on-remove="handleRemove">
              <Button icon="ios-cloud-upload-outline" :disabled="resource.length >= fileSize">上传</Button>
            </Upload>
          </FormItem>
        </template>
        <!-- 发布位置 -->
        <template v-slot:location="slotProps">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <div class="location">
              <Button @click="choiceLocation" type="primary">选择经纬度</Button>
              <p v-if="location['lng']">位置:{{location['location']}}，经度：{{location['lng']}}，纬度{{location['lat']}}</p>
            </div>
          </FormItem>
        </template>
        <!-- 时间选择 -->
        <template v-slot:activity_date="slotProps" v-if="showModule">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <DatePicker type="date" placeholder="选择活动时间" style="width: 200px" @on-change="onChange"></DatePicker>
          </FormItem>
        </template>
      </wz-form>
    </Modal>
    <mapaddress ref="mapaddress" @map-confirm="mapConfirm"></mapaddress>
  </div>
</template>
<script>
import form from './mixins/form';
import upload from './mixins/upload';

export default {
  mixins: [form, upload],
  props: {
    activityModel: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    activityModel: {
      deep: true,
      handler(val) {
        this.porosActivityModel = val;
      }
    }
  },
  data() {
    return {
      porosActivityModel: false,
      loading: true,
      // 展示时间弹窗或时间范围
      showModule: false
    };
  },
  methods: {
    onChange(val) {
      this.changeValue('activity_date', val);
    },
    // 改变form值
    changeValue(key, value) {
      this.$refs.form.changeValue(key, value);
    },
    choiceLocation() {
      this.$refs.mapaddress.show();
    },
    // 地图确认
    async mapConfirm(e, cityode, add, secondCode) {
      this.location = {
        lng: e[0],
        lat: e[1],
        location: add,
        city: secondCode
      };
      this.changeValue('location', this.location);
      try {
        const validate = await this.$refs['form'].validate();
        console.log(validate);
      } catch (error) {
        console.log(error);
      }
    },
    initFormObj() {
      this.formObj = {
        sectionData: 2,
        section: '一整天',
        expect: []
      };
      this.location = {};
      this.resource = [];
      this.accept = '';
      this.$emit('update:activityModel', false);
    },
    // 取消
    onCancel() {
      this.initFormObj();
    },
    // 确定发布动态
    async onAcitveSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        this.formData = { ...validate.data, ...{} };
        delete this.formData['sectionData'];
        this.$emit('addActivity', this.formData);
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.emoj-Model {
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  .emoj-icon {
    display: inline-block;
    margin: 3px;
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
}
.amap {
  &-wrapper {
    width: 100%;
    height: 450px;
    position: relative;
  }
  &-search {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
    width: 350px;
    #panel {
      overflow: auto;
      height: 300px;
    }
  }
}
</style>