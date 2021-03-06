<!--
 * @Author: wuzhen
 * @Date: 2019-01-24 16:48:42
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-22 10:32:34
 * @Description: 数字累加动画组件
 -->
<template>
  <div class="count-to-wrapper">
    <slot name="left" />
    <p class="content-outer">
      <span :id="counterId" :class="['count-to-count-text', countClass]">{{ init }}</span>
      <i :class="['count-to-unit-text', unitClass]">{{ unitText }}</i>
    </p>
    <slot name="right" />
  </div>
</template>

<script>
import CountUp from 'countup'
export default {
  // name: 'CountTo',
  name: 'CountUp',
  props: {
    init: {
      type: Number,
      default: 0
    },
    /**
     * @description 起始值，即动画开始前显示的数值
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 结束值，即动画结束后显示的数值
     */
    end: {
      type: Number,
      required: true
    },
    /**
     * @description 保留几位小数
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 分隔整数和小数的符号，默认是小数点
     */
    decimal: {
      type: String,
      default: '.'
    },
    /**
     * @description 动画持续的时间，单位是秒
     */
    duration: {
      type: Number,
      default: 2
    },
    /**
     * @description 动画延迟开始的时间，单位是秒
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description 是否禁用easing动画效果
     */
    uneasing: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否使用分组，分组后每三位会用一个符号分隔
     */
    usegroup: {
      type: Boolean,
      default: false
    },
    /**
     * @description 用于分组(usegroup)的符号
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 是否简化显示，设为true后会使用unit单位来做相关省略
     */
    simplify: {
      type: Boolean,
      default: false
    },
    /**
     * @description 自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略
     *              1000即显示为1K+
     */
    unit: {
      type: Array,
      default() {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
      }
    },
    countClass: {
      type: String,
      default: ''
    },
    unitClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      counter: null,
      unitText: ''
    }
  },
  computed: {
    counterId() {
      return `count_to_${this._uid}`
    }
  },
  watch: {
    end(newVal) {
      const endVal = this.getValue(newVal)
      this.counter.update(endVal)
    }
  },
  mounted() {
    this.$nextTick(() => {
      const endVal = this.getValue(this.end)
      let count = 0
      if (String(endVal).includes('.')) {
        const y = String(endVal).indexOf('.') + 1// 获取小数点的位置
        count = String(endVal).length - y// 获取小数点后的个数
        if (count > 2) {
          count = 2
        }
      }
      this.counter = new CountUp(
        this.counterId,
        this.startVal,
        endVal,
        count,
        this.duration,
        this.decimals,
        {
          useEasing: !this.uneasing,
          useGrouping: this.useGroup,
          separator: this.separator,
          decimal: this.decimal
        }
      )
      setTimeout(() => {
        if (!this.counter.error) {
          this.counter.start()
        }
      }, this.delay)
    })
  },
  methods: {
    getHandleVal(val, len) {
      return {
        endVal: parseInt(val / Math.pow(10, this.unit[len - 1][0]), 10),
        unitText: this.unit[len - 1][1]
      }
    },
    transformValue(val) {
      const len = this.unit.length
      let res = {
        endVal: 0,
        unitText: ''
      }
      if (val < Math.pow(10, this.unit[0][0])) {
        res.endVal = val
      } else {
        for (let i = 1; i < len; i++) {
          if (
            val >= Math.pow(10, this.unit[i - 1][0]) &&
            val < Math.pow(10, this.unit[i][0])
          ) {
            res = this.getHandleVal(val, i)
          }
        }
      }
      if (val > Math.pow(10, this.unit[len - 1][0])) {
        res = this.getHandleVal(val, len)
        return res
      }
    },
    getValue(val) {
      let res = 0
      if (this.simplify) {
        const { endVal, unitText } = this.transformValue(val)
        this.unitText = unitText
        res = endVal
      } else {
        res = val
      }
      return res
    }
  }
}
</script>

<style lang="less" scoped>
.count-to-wrapper {
  line-height: 28px;
  .content-outer {
    display: inline-block;
    .count-to-unit-text {
      font-style: normal;
    }
  }
}
</style>
