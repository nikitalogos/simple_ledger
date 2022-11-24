<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useTimeline } from 'src/composables/timeline.ts'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  data (){
    return {
      tl: null,
    }
  },
  computed: {
    now_line_x() {
      return (this.tl.now_time - this.tl.start_time) / this.tl.duration * this.el_width
    },
    now_text_x() {
      const text_width = 30
      const text_width_long = 45
      const margin = 5

      if (this.now_line_x < 0) {
        return margin
      } else if (this.now_line_x < this.el_width / 2) {
        return this.now_line_x + margin
      } else if (this.now_line_x < this.el_width) {
        return this.now_line_x - text_width - margin
      } else {
        return this.el_width - text_width_long - margin
      }
    },
    now_text() {
      return (this.now_line_x < 0 ? '< ' : '') + 'now' + (this.now_line_x < this.el_width ? '' : ' >')
    },
  },
  methods: {
    fit_now() {
      this.tl.start_time = this.tl.now_time - this.tl.duration / 2
    },
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline
  },
});
</script>

<template>
  <div :id="id" class="graph-canvas">
    <div class="now-line" :style="{left: now_line_x + 'px'}"></div>
    <div class="now-text" :style="{left: now_text_x + 'px'}" @dblclick="fit_now()">{{ now_text }}</div>
  </div>
</template>

<style scoped lang="scss">
.graph-canvas {
  background-color: white;

  width: 100%;
  height: 100%;

  position: relative;
  overflow: hidden;

  .now-line {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 1px;
    top: 0;
    background-color: red;
  }
  .now-text {
    position: absolute;
    z-index: 100;
    top: 0;
    color: red;
    user-select: none;
  }
}
</style>
