<template>
  <div>
    <ve-line :data="veData" width='100%' :extend="extend" :colors="colors" ref="chart" height="500px" :settings="chartSettings" :data-empty="dataEmpty"></ve-line>
  </div>
</template>
<script>
export default {
  props: {
    veData: {
      type: Object,
      default: () => { }
    },
    chartSettings: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    this.toolbox = {
      show: true,
      feature: {
        magicType: { type: ['line', 'bar'] },
        saveAsImage: {}
      }
    };
    this.extend = {
      'xAxis.0.axisLabel.rotate': -45,
      series: {
        barWidth: 15,
        label: {
          show: true
        },
        smooth: false
      }
    };
    this.colors = ['#695ff9'];
    return {
      dataEmpty: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs['chart'].echarts.resize();
      }, 200);
    });
    this.$bus.$on('changeCollapsed', () => {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs['chart'].echarts.resize();
        }, 200);
      });
    });
  }
};
</script>
