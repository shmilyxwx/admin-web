<template>
  <div class="box">
    <div v-for="(item, index) in infoData" :key="index" :span="3" style="height: 120px;padding-bottom: 10px">
      <div class="border" :class="{ active: index===activeIndex }" @click="selectItem(index)">
        <count-up :end="item.count" count-class="count-style" />
        <p style="font-size:14px;color:#999">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoData: {
      type: Array,
      default: () => { }
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    selectItem(index) {
      this.activeIndex = index
      this.$emit('userSelect', index)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  margin-bottom: 30px;
  display: flex;
  > div {
    width: 160px;
    margin-right: 20px;
  }
}
.border {
  border: 1px solid #dcdee2;
  border-radius: 5px;
  padding: 8px 10px 5px;
  cursor: pointer;
  transition: all 0.2s;
  &.active {
    background: #695ff9;
    border-color: #695ff9;
    color: #fff !important;
    p {
      color: #fff !important;
    }
  }
}
</style>
