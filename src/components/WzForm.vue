<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:08:54
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-12 16:32:17
 * @Description: form表格组件
 -->
<template>
  <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="labelPos==='top'?null:labelWidth" :label-colon="labelColon" :label-position="labelPos">
    <template v-for="(form, formIndex) in formProps">
      <div :key="formIndex">
        <div v-if="form.title" class="form-title">
          <h3><span>{{ form.title }}</span></h3>
        </div>
        <Row v-for="(item,itemIndex) in form.forms" :key="itemIndex">
          <slot v-if="item.slot" :name="item.key" :item="item" />
          <FormItem v-else :prop="item.key" :label="item.label" :rules="item.rules">
            <!-- radio类型 -->
            <template v-if="item.type==='radio'">
              <RadioGroup v-model="formData[item.key]" :type="item.options.type" @on-change="changeValue(item.key, formData[item.key])">
                <Radio v-for="child in item.options.data" :key="child.value" :border="child.border" :label="child.value" :disabled="formData['disabled'] && item.editDisabled">{{ child.label }}</Radio>
              </RadioGroup>
            </template>
            <!-- checkbox 类型 -->
            <template v-else-if="item.type==='checkbox'">
              <CheckboxGroup v-model="formData[item.key]" @on-change="changeValue(item.key, formData[item.key])">
                <Checkbox v-for="child in item.options.data" :key="child.value" :border="child.border" :label="child.value" :disabled="formData['disabled'] && item.editDisabled">
                  <span>{{ child.label }}</span>
                </Checkbox>
              </CheckboxGroup>
            </template>
            <!-- switch类型 -->
            <template v-else-if="item.type==='switch'">
              <i-switch v-model="formData[item.key]" :disabled="formData['disabled'] && item.editDisabled" size="large">
                <span slot="open">{{ item.open || '开启' }}</span>
                <span slot="close">{{ item.close || '关闭' }}</span>
              </i-switch>
            </template>
            <!-- select类型 -->
            <template v-else-if="item.type==='select'">
              <Select v-model="formData[item.key]" :disabled="formData['disabled'] && item.editDisabled" clearable :multiple="item.multiple" :max-tag-count="item.maxTag || 100" :max-tag-placeholder="maxTagPlaceholder" filterable :placeholder="item.placeholder || `请选择${item.label}`" @on-change="changeValue(item.key, formData[item.key])">
                <Option v-for="child in item.options.data" :key="child.value" :disabled="child.disabled" :value="child.value" :label="child.label" />
              </Select>
            </template>
            <!-- Cascader级联动 -->
            <template v-else-if="item.type==='cascader'">
              <Cascader v-model="formData[item.key]" :disabled="formData['disabled'] && item.editDisabled" :data="item.options.data" clearable :placeholder="item.placeholder || `选择${item.label}`" :change-on-select="item.isChange" />
            </template>
            <!-- datePicker类型 -->
            <template v-else-if="item.type==='date' || item.type==='daterange' || item.type==='datetime' || item.type==='datetimerange' || item.type==='year' || item.type==='month'">
              <DatePicker
                v-model="formData[item.key]"
                :disabled="formData['disabled'] && item.editDisabled"
                :type="item.type"
                clearable
                :format="item.format"
                :confirm="item.confirm"
                :readonly="item.readonly"
                :start-date="item.startDate || new Date()"
                :multiple="item.multiple && item.type==='date'"
                :split-panels="item.split"
                :options="item.options || null"
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width:100%"
                @on-change="(e) => changeValue(item.key, e)"
              />
            </template>
            <!-- timePicker类型 -->
            <template v-else-if="item.type==='time' || item.type==='timerange'">
              <TimePicker v-model="formData[item.key]" :disabled="formData['disabled'] && item.editDisabled" :type="item.type" clearable :format="item.format" :steps="item.steps" :readonly="item.readonly" :confirm="item.confirm" :placeholder="item.placeholder || `请选择${item.label}`" style="width:100%" />
            </template>
            <!-- password类型 -->
            <template v-else-if="item.type==='password'">
              <Input v-model="formData[item.key]" type="password" :disabled="formData['disabled'] && item.editDisabled" :maxlength="item.maxlength || 200" password :placeholder="item.placeholder || `请输入${item.label}`" /></Input>
            </template>
            <!-- number类型 -->
            <template v-else-if="item.type==='number'">
              <Input v-model.number="formData[item.key]" type="number" :disabled="formData['disabled'] && item.editDisabled" :maxlength="item.maxlength || 20" :readonly="item.readonly" :placeholder="item.placeholder || `请输入${item.label}`" />
              <span v-if="item.prepend" slot="prepend">{{ item.prepend }}</span>
              <span v-if="item.append" slot="append">{{ item.append }}</span>
              </Input>
            </template>
            <!-- inputNumber类型 -->
            <template v-else-if="item.type==='inputNumber'">
              <InputNumber v-model="formData[item.key]" :max="item.max || 999999" :min="item.min || 0" :step="item.step || 1" :placeholder="item.placeholder || `请输入${item.label}`" :readonly="item.readonly" style="width:100%" @on-change="changeValue(item.key, formData[item.key])" />
            </template>
            <!-- 文本输入框 -->
            <template v-else>
              <Input v-model="formData[item.key]" :type="item.type || 'text'" :disabled="formData['disabled'] && item.editDisabled" :rows="item.row || 4" clearable :readonly="item.readonly" :show-word-limit="item.showLimit" :maxlength="item.maxlength || 200" :placeholder="item.placeholder || `请输入${item.label}`" />
              <span v-if="item.prepend" slot="prepend">{{ item.prepend }}</span>
              <span v-if="item.append" slot="append">{{ item.append }}</span>
              </Input>
            </template>
          </FormItem>
        </Row>
      </div>
    </template>
    <slot name="footer" />
  </Form>
</template>
<script>
export default {
  name: 'wzForm',
  props: {
    // 表单配置
    formProps: {
      type: Array,
      default: () => { }
    },
    // 表单默认对象值
    formObj: {
      type: Object,
      default: () => { }
    },
    // 表单验证规则
    ruleValidate: {
      type: Object,
      default: () => { }
    },
    // 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
    labelWidth: {
      type: Number,
      default: 100
    },
    // label位置可选top,left,right
    labelPos: {
      type: String,
      default: 'right'
    },
    // 是否自动在 label 名称后添加冒号
    labelColon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: { ...{}, ...this.formObj }
    }
  },
  methods: {
    // select更多选择
    maxTagPlaceholder(num) {
      return `更多(${num})`
    },
    // 从父组件修改值
    changeValue(key, value) {
      this.$set(this.formData, key, value)
    },
    // 表单验证
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            resolve({
              ...{
                data: this.formData,
                valid: valid
              }
            })
          } else {
            reject(new Error())
          }
        })
      })
    },
    // 重置表单
    reset() {
      this.$refs['formData'].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.form-title {
  margin: 10px 0 20px;
  h3 {
    font-size: 16px;
    font-weight: bold;
    background: #f5f5f5;
    border-left: 3px solid #695ff9;
    color: #695ff9;
    padding: 5px 10px;
  }
}
</style>
