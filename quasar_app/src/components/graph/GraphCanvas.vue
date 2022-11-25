<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useEditor } from 'src/composables/editor.ts'
import { useTimeline } from 'src/composables/timeline.ts'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  data (){
    return {
      editor: null,
      tl: null,

      selected_account: 'card_rub'
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

    points() {
      if (!this.editor?.transactions){
        return null
      }

      const points = []
      let sum = 0
      this.editor.transactions.forEach((transaction) => {
        let amount
        if (transaction.acc_to === this.selected_account) {
          amount = transaction.amount
        } else if (transaction.acc_from === this.selected_account) {
          amount = -transaction.amount
        } else {
          return
        }
        sum += amount
        const time = transaction.mdate.valueOf()
        points.push({
          amount,
          time,
          sum,
        })
      })
      points.sort((a, b) => a.time - b.time)

      const amounts = points.map((point) => point.sum)
      const amount_min = Math.min(...amounts)
      const amount_max = Math.max(...amounts)
      const amount_spread = amount_max - amount_min
      const padding_px = 10

      let x_last = 0
      let y_last = 0

      points.forEach((point) => {
        const amount_normed = (point.sum - amount_min) / amount_spread
        const x = (point.time - this.tl.start_time) / this.tl.duration * this.el_width
        const y = (1 - amount_normed) * (this.el_height - padding_px * 2) + padding_px
        Object.assign(point, {
          x: x,
          y: y,
          dx: x - x_last,
          dy: y - y_last,
        })
        x_last = x
        y_last = y
      })

      return points
    },
  },
  methods: {
    fit_now() {
      this.tl.start_time = this.tl.now_time - this.tl.duration / 2
    },
  },
  created(){
    const { editor } = useEditor()
    this.editor = editor

    const { timeline } = useTimeline()
    this.tl = timeline
  },
});
</script>

<template>
  <div :id="id" class="graph-canvas">
    <div class="now-line" :style="{left: now_line_x + 'px'}"></div>
    <div class="now-text" :style="{left: now_text_x + 'px'}" @dblclick="fit_now()">{{ now_text }}</div>
    <div
      v-for="(point, idx) in points"
      :key="'point' + idx"
      class="point"
      :style="{left: point.x + 'px', top: point.y + 'px'}"
    >
    </div>
    <div
      v-for="(point, idx) in points.slice(1)"
      :key="'hline' + idx"
      class="line"
      :style="{
        left: (point.x - point.dx) + 'px',
        top: (point.y - point.dy) + 'px',
        height: '1px',
        width: point.dx + 'px',
      }"
    ></div>
    <div
      v-for="(point, idx) in points.slice(1)"
      :key="'vline' + idx"
      class="line"
      :style="{
        left: point.x + 'px',
        top: (point.dy > 0 ? (point.y - point.dy) : point.y) + 'px',
        height: Math.abs(point.dy) + 'px',
        width: '1px',
      }"
    ></div>

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
    background-color: red;
  }
  .now-text {
    position: absolute;
    z-index: 100;
    color: red;
    user-select: none;
  }

  .point {
    position: absolute;
    z-index: 100;
    color: black;

    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin: -5px;
    background-color: red;
  }
  .line {
    position: absolute;
    z-index: 100;
    background-color: red;
  }
}
</style>
