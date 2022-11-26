<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useGraph } from 'src/composables/graph.ts'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  data (){
    return {
      graph: null,
    }
  },
  computed: {
    ticks() {
      if (!this.el_height){
        return []
      }
      const max_ticks_num = Math.floor(this.el_height / this.graph.tick_height_px)
      if (max_ticks_num === 0){
        return []
      }
      const spread = this.graph.max_value - this.graph.min_value
      if (spread === 0){
        return []
      }
      const min_step = spread / max_ticks_num

      const log10_int = Math.floor(Math.log10(min_step))
      const first_digit = Math.floor(min_step / 10 ** log10_int)
      const tick_step = [1, 2, 5, 5, 5, 10, 10, 10, 10, 10][first_digit] * 10 ** log10_int

      const first_tick = Math.ceil(this.graph.min_value / tick_step) * tick_step

      const ticks = []
      for (let value = first_tick; value < this.graph.max_value; value += tick_step) {
        const value_normed = (value - this.graph.min_value) / spread
        const y = (1 - value_normed) * (this.el_height - this.graph.padding_v_px) + this.graph.padding_v_px
        ticks.push({
          value,
          y,
        })
      }
      return ticks
    },
  },
  created(){
    const { graph } = useGraph()
    this.graph = graph
  },
});
</script>

<template>
  <div :id="id" class="graph-y-scale">
    <div
      class="tick"
      v-for="(tick, idx) in ticks"
      :key="'tick' + idx"
      :style="{top: tick.y + 'px'}"
    >
      {{tick.value}}
    </div>
    <div
      class="line"
      v-for="(tick, idx) in ticks"
      :key="'line' + idx"
      :style="{top: tick.y + 'px'}"
    >
    </div>
  </div>
</template>

<style scoped lang="scss">
.graph-y-scale {
  width: 100%;
  height: 100%;

  position: relative;

  .tick {
    position: absolute;
  }
  .line {
    position: absolute;
    height: 1px;
    width: 100px;
    background-color: red;
  }
}
</style>
