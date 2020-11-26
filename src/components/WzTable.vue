<!--
 * @Author: wuzhen
 * @Date: 2019-01-23 11:05:41
 * @LastEditors: fightWz
 * @LastEditTime: 2020-10-27 10:10:59
 * @Description: table表格组件
 -->
<template>
  <Card :dis-hover="disHover" :bordered="card" :padding="card?16:0" :title="card?title:''" style="width:100%" class="table-card">
    <div v-if="(handleBtns.length || batchBtns.length) && (isAction || showBtns)" slot="extra" class="btn">
      <!-- 操作按钮 -->
      <Button v-for="(item, index) in handleBtns" :key="index" :type="item.type || 'primary'" style="margin-left: 10px" @click="$emit('handle-click', item.btnType)">
        <i style="margin-right:5px">
          <s-icon v-if="item.icon" :name="item.icon" scale="1.5" />
        </i>
        {{ item.text }}
      </Button>
      <!-- 批量操作 -->
      <Dropdown v-if="batchBtns.length" style="margin-left: 10px" @on-click="(e) => $emit('handle-click', e)">
        <Button>
          批量操作
          <Icon type="ios-arrow-down" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem v-for="(item, index) in batchBtns" :key="index" :name="item.btnType">{{ item.text }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="table-list">
      <slot name="table-header" />
      <Table
        ref="table"
        :data="tableData"
        :columns="columns"
        :stripe="stripe"
        :border="border"
        :show-header="showHeader"
        :loading="loading"
        :row-class-name="rowClassName"
        :size="size"
        :show-summary="showSummary"
        :sum-text="sumText"
        @on-selection-change="(e) => $emit('on-selection-change', e)"
        @on-sort-change="(e) => $emit('on-sort-change', e)"
      />
      <slot name="table-footer" />
      <!-- 分页 -->
      <div v-if="showPage" style="overflow: hidden">
        <Page
          id="pageId"
          :current="pageParams['page']"
          :total="total"
          :disabled="!total"
          :page-size="pageParams['page_size']"
          :page-size-opts="[10, 30, 50, 100]"
          :show-total="showTotal"
          :show-elevator="showElevator"
          show-sizer
          transfer
          class-name="page"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
        <Button type="primary" class="jump" size="small" @click="goElevatorPage('pageId')">跳转</Button>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'wzTable',
  props: {
    card: {
      type: Boolean,
      default: true
    },
    disHover: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '数据列表'
    },
    // 表格数据获取接口api方法
    dataApi: {
      type: Function,
      default: () => console.log()
    },
    // 表格列的配置描述
    columns: {
      type: Array,
      default: () => []
    },
    // 是否显示间隔斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否显示纵向边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 表格尺寸，可选值为 large、small、default 或者不填
    size: {
      type: String,
      default: 'default'
    },
    // 是否在表尾显示合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合计行第一列的文本
    sumText: {
      type: String,
      default: '合计'
    },
    // 是否显示分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 表格按钮
    handleBtns: {
      type: Array,
      default: () => []
    },
    // 批量操作按钮
    batchBtns: {
      type: Array,
      default: () => []
    },
    showBtns: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showElevator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      pageParams: {
        page: 1,
        page_size: this.pageSize
      },
      total: 0,
      tableData: []
    }
  },
  computed: {
    isAction() {
      const permision = this.$store.getters.permision
      const isAction = permision.includes(`${this.$route.name}_action`) || this.$config.openPermision
      return isAction
    }
  },
  methods: {
    // 获取表格数据
    async getData(params = {}) {
      try {
        this.tableData = []
        this.loading = true
        this.searchParams = { ...this.$commonJS.delFalseKey(params), ...this.pageParams }
        const res = await this.dataApi(this.searchParams)
        this.tableData = res.data.data || res.data || []
        this.total = res.data.total || 0
        this.loading = false
        this.$nextTick(() => {
          this.getPageSize()
        })
      } catch (error) {
        this.$Message.error(error.msg || '获取数据失败')
        this.loading = false
      }
    },
    // 搜索
    filterData(params) {
      this.pageParams = {
        page: 1,
        page_size: this.pageSize
      }
      this.getData(params)
    },

    // 修改页码
    changePage(val) {
      this.pageParams['page'] = val
      this.getData(this.searchParams)
    },
    // 修改显示条数
    changePageSize(val) {
      this.pageParams['page_size'] = val
      this.getData()
    },
    // 获取分页的数据
    getPageSize() {
      this.$emit('get-page-size', this.pageParams)
    },
    rowClassName(row) {
      if (row.disabled) {
        return 'table-disabled-row'
      }
      return ''
    },
    goElevatorPage(pageId) {
      let evtObj
      const thisPage = document.getElementById(pageId)
      const elevatorDiv = thisPage.getElementsByClassName('ivu-page-options-elevator')
      if (elevatorDiv && elevatorDiv.length > 0) {
        const pageInput = elevatorDiv[0].getElementsByTagName('input')[0]
        if (window.KeyEvent) { // firefox 浏览器下模拟事件
          evtObj = document.createEvent('KeyEvents')
          evtObj.initKeyEvent('keyup', true, true, window, true, false, false, false, 13, 0)
        } else { // chrome 浏览器下模拟事件
          evtObj = document.createEvent('UIEvents')
          evtObj.initUIEvent('keyup', true, true, window, 1)
          delete evtObj.keyCode
          if (typeof evtObj.keyCode === 'undefined') { // 为了模拟keycode
            Object.defineProperty(evtObj, 'keyCode', { value: 13 })
          } else {
            evtObj.key = String.fromCharCode(13)
          }
        }
        pageInput.dispatchEvent(evtObj)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-list {
  position: relative;
  .page {
    margin: 20px 0 10px;
    overflow: hidden;
    float: right;
    margin-right: 80px;
  }
  .jump{
    position: absolute;
    right: 0;
    bottom: 14px;
  }
}
</style>

<style lang="less">
.table-card {
  .ivu-card-head {
    padding: 18px 16px;
  }
}
</style>
