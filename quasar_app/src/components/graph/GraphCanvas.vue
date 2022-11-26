<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useEditor } from 'src/composables/editor.ts'
import { useTimeline } from 'src/composables/timeline.ts'
import { useGraph } from 'src/composables/graph.ts'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  data (){
    return {
      editor: null,
      tl: null,
      graph: null,

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

      let transactions = [...this.editor.transactions]
      transactions.sort((a,b) => a.time - b.time)
      // leave transactions from start to the first that is bigger than the graph scale
      const last_transaction_idx = transactions.findIndex((tr) => tr.time > this.tl.end_time)
      if (last_transaction_idx !== -1){
        transactions = transactions.slice(0, last_transaction_idx + 1)
      }

      const points = []
      let sum = 0
      transactions.forEach((transaction) => {
        // all transactions since start add up to sum
        let amount
        if (transaction.acc_to === this.selected_account) {
          amount = transaction.amount
        } else if (transaction.acc_from === this.selected_account) {
          amount = -transaction.amount
        } else {
          return
        }
        sum += amount

        // only visible transactions become points
        const time = transaction.time
        if (time > this.tl.start_time) {
          const x = (time - this.tl.start_time) / this.tl.duration * this.el_width
          points.push({
            amount,
            sum,
            time,
            x,
          })
        }
      })

      const amounts = points.map((point) => point.sum)
      const amount_min = Math.min(...amounts)
      const amount_max = Math.max(...amounts)
      const amount_spread = (amount_max - amount_min) + 1e-30 // prevent zero division

      let x_last = 1e30 // set infinite time to make dx,dy positive for the first point
      let y_last = 1e30

      points.forEach((point) => {
        const amount_normed = (point.sum - amount_min) / amount_spread
        const y = (1 - amount_normed) * (this.el_height - this.graph.padding_v_px) + this.graph.padding_v_px
        Object.assign(point, {
          y: y,
          dx: point.x - x_last,
          dy: y - y_last,
        })
        x_last = point.x
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
  watch: {
    points(points) {
      const amounts = points.map((point) => point.sum)
      this.graph.min_value = Math.min(...amounts)
      this.graph.max_value = Math.max(...amounts)
    }
  },
  created(){
    const { editor } = useEditor()
    this.editor = editor

    const { timeline } = useTimeline()
    this.tl = timeline

    const { graph } = useGraph()
    this.graph = graph
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
      :class="{income: point.dy <= 0, expense: point.dy > 0}"
      :style="{left: point.x + 'px', top: point.y + 'px'}"
    >
    </div>
    <div
      v-for="(point, idx) in points.slice(1)"
      :key="'hline' + idx"
      class="line"
      :class="{income: point.dy <= 0, expense: point.dy > 0}"
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
      :class="{income: point.dy <= 0, expense: point.dy > 0}"
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
  width: 100%;
  height: 100%;

  position: relative;
  overflow: hidden;

  .now-line {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 1px;
    background-color: var(--highlight-color);
  }
  .now-text {
    position: absolute;
    z-index: 100;
    color: var(--highlight-color);
    user-select: none;
    cursor: pointer;
  }

  .point {
    position: absolute;
    z-index: 2;
    color: black;

    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin: -5px;
    background-color: red;
  }
  .line {
    position: absolute;
    z-index: 1;
  }
  .income {
    background-color: var(--income-color);
  }
  .expense {
    background-color: var(--expense-color);
  }
}
</style>
