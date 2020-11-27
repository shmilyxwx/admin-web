<!--
 * @Author: fightWz
 * @Date: 2020-05-06 15:33:41
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:32:16
 * @Description: 表格搜索
 -->
<template>
  <div class="table-search">
    <Card :title="title" style="width:100%;margin-bottom: 10px;">
      <div class="table-search-con">
        <div class="table-search-form">
          <Form ref="formData" :model="formData" :label-width="labelWidth" inline label-colon @submit.native.prevent>
            <FormItem v-for="(item, index) in searchProps" :key="index" :label="item.label" :label-width="!item.label?0: item.labelWidth || labelWidth">
              <template v-if="item.slot">
                <slot :name="item.key" :item="item" />
              </template>
              <!-- Select类型 -->
              <template v-else-if="item.type=='select'">
                <Select v-model="formData[item.key]" :multiple="item.multiple" clearable filterable :max-tag-count="item.maxTagCount" :placeholder="item.placeholder || `选择${item.label}`" :style="{width: `${item.width|| 180}px`}">
                  <Option v-for="child in item.options.data" :key="child.value" :value="child.value" :label="child.label" />
                </Select>
              </template>
              <!-- datePicker类型 -->
              <template v-else-if="item.type==='date' || item.type==='daterange' || item.type==='datetime' || item.type==='datetimerange' || item.type==='year' || item.type==='month'">
                <DatePicker
                  v-model="formData[item.key]"
                  :type="item.type"
                  clearable
                  :format="item.format"
                  :confirm="item.confirm"
                  :multiple="item.multiple && item.type==='date'"
                  :split-panels="item.split"
                  :options="item.options || null"
                  :placeholder="item.placeholder || `请选择${item.label}`"
                  :style="{width: `${item.width|| 180}px`}"
                  @on-change="(e) => changeValue(item.key, e)"
                />
              </template>
              <!-- timePicker类型 -->
              <template v-else-if="item.type==='time' || item.type==='timerange'">
                <TimePicker v-model="formData[item.key]" :type="item.type" clearable :format="item.format" :steps="item.steps" :confirm="item.confirm" :placeholder="item.placeholder || `请选择${item.label}`" :style="{width: `${item.width|| 180}px`}" />
              </template>
              <!-- inputNumber类型 -->
              <template v-else-if="item.type==='inputNumber'">
                <InputNumber v-model="formData[item.key]" :max="item.max || 999999999" :min="item.min || 0" :step="item.step || 1" :clearable="!item.clearable" :placeholder="item.placeholder || `请选择${item.label}`" :style="{width: `${item.width|| 180}px`}" />
              </template>
              <template v-else>
                <Input v-model="formData[item.key]" :type="item.type || 'text'" clearable :placeholder="item.placeholder || `输入${item.label}`" :style="{width: `${item.width|| 180}px`}" @keyup.enter.native="handleFilter" />
                <span v-if="item.prepend" slot="prepend">{{ item.prepend }}</span>
                <span v-if="item.append" slot="append">{{ item.append }}</span>
                </Input>
              </template>
            </FormItem>
          </Form>
        </div>
        <div class="table-search-btn">
          <Button type="primary" style="margin-right:10px" @click.stop="handleFilter">
            <Icon type="ios-search" size="16" />查询
          </Button>
          <Button @click.stop="onReset()">
            <Icon type="ios-undo" size="16" />重置
          </Button>
        </div>
      </div>
      <slot name="content" />
    </Card>
  </div>
</template>
<script>
export default {
  name: 'SearchTable',
  props: {
    // 查询参数配置
    searchProps: {
      type: Array,
      default: () => []
    },
    // 高级搜索参数配置
    advancedProps: {
      type: Array,
      default: () => []
    },
    // 默认参数
    searchParams: {
      type: Object,
      default: () => { }
    },

    // label宽度
    labelWidth: {
      type: [String, Number],
      default: 80
    },
    title: {
      type: String,
      default: '数据筛选'
    }
  },
  data() {
    return {
      formData: { ...{}, ...this.searchParams }
    }
  },
  methods: {
    // 修改值
    changeValue(key, value) {
      this.formData[key] = value
    },
    // 重置表单
    onReset() {
      this.formData = { ...{}, ...this.searchParams }
      this.$emit('handle-filter', { ...this.formData }, 'reset')
    },
    // 搜索
    handleFilter() {
      const data = {}
      for (const key in this.formData) {
        if ((Array.isArray(this.formData[key]) && this.formData[key][0]) || (!Array.isArray(this.formData[key]) && String(this.formData[key]) !== 'null')) {
          data[key] = this.formData[key]
        }
      }
      this.$emit('handle-filter', data)
    }
  }
}
</script>

<style lang="less" scoped>
.table-search {
  &-title {
    h2 {
      font-size: 12px;
    }
  }
  &-con {
    display: flex;
  }
  &-form {
    flex: 1;
  }
}
</style>
