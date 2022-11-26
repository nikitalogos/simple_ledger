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
      v-for="(tick, idx) in graph.ticks"
      :key="'tick' + idx"
      :style="{bottom: (el_height - tick.y) + 'px'}"
    >
      {{tick.text}}
    </div>
    <div
      class="line"
      v-for="(tick, idx) in graph.ticks"
      :key="'line' + idx"
      :style="{top: tick.y + 'px'}"
    >
    </div>
  </div>
</template>

<style scoped lang="scss">
.graph-y-scale {
  width: var(--graph-y-scale-width);
  height: 100%;

  position: relative;

  .tick {
    position: absolute;
    left: 8px;
  }
  .line {
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: white;
  }
}
</style>
