<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-10 10:37:37
 * @Description: 用户选择
 -->
<template>
  <div>
    <Modal v-model="porosCommentModel" title="发布评论" :loading="loading" @on-ok="onCommentSubmit" @on-cancel='onCancel' width="650">
      <wz-form v-if="porosCommentModel" ref="form" :form-props="formProps" :form-obj="formObj" :label-width="130">
        <!-- 发布内容 -->
        <template v-slot:content="slotProps">
          <FormItem :prop="slotProps.item.key" :label="slotProps.item.label" :rules="slotProps.item.rules">
            <Input :type="slotProps.item.type || 'text'" :rows="4" v-model="formObj['content']" show-word-limit :maxlength="200" :placeholder="slotProps.item.placeholder || `请输入${slotProps.item.label}`" @on-blur="changeValue('content', formObj['content'])"></Input>
            <!-- 表情 -->
            <!-- <Tabs value="name1" type="card" style="margin-top: 10px">
              <TabPane label="表情" name="name1">
                <div class="emoj-Model">
                  <div class="emoj-icon" v-for="(item, index) in emojs" :key="index" @click.stop="onChoiceEmoj(item.name)">
                    <img :src="item.filename" :alt="item.name" :title="item.name" />
                  </div>
                </div>
              </TabPane>
            </Tabs> -->
          </FormItem>
        </template>
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
import emojs from '@/assets/Chat_Faces';
export default {
  mixins: [form],
  props: {
    commentModel: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      default: '男'
    }
  },
  computed: {
    emojs() {
      return emojs;
    }
  },
  watch: {
    commentModel: {
      deep: true,
      handler(val) {
        this.porosCommentModel = val;
      }
    }
  },
  data() {
    return {
      porosCommentModel: false,
      loading: true
    };
  },
  methods: {
    changeUser(val) {
      let selectUser = this.userOptions.filter(v => v.custom_id === Number(val.split('---')[2]));
      this.changeValue('user_id', selectUser[0].id);
    },
    async onCommentSubmit() {
      try {
        const validate = await this.$refs['form'].validate();
        this.formData = { ...validate.data };
        delete this.formData['search_type'];
        this.$emit('commentSure', this.formData);
      } catch (error) {
        this.$Message.error(error.msg || '服务器异常');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }
    },
    // 评论发送表情
    onChoiceEmoj(text) {
      this.formObj['content'] = this.formObj['content'] + `[${text}]`;
      this.changeValue('content', this.formObj['content']);
    },
    initFormObj() {
      this.formObj = { search_type: 1, user_id: '',content:'' };
      this.userOptions = [];
      this.$emit('update:commentModel', false);
    },
    onCancel() {
      this.initFormObj();
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