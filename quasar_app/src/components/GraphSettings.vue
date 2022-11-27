<script lang="ts">
import { defineComponent } from 'vue';

import { useTimeline } from 'src/composables/timeline.ts'
import { useEditor } from 'src/composables/editor.ts'
import { useGraph } from 'src/composables/graph.ts'

export default defineComponent({
  data (){
    return {
      tl: null,
      editor: null,
      graph: null,
    }
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline

    const { editor } = useEditor()
    this.editor = editor

    const { graph } = useGraph()
    this.graph = graph
  },
});
</script>

<template>
  <div>
    <div class="button" style="width: fit-content;" @click="tl.reset_zoom()">Reset zoom</div>
    <select v-model="graph.account">
      <option v-for="(account, idx) in editor.accounts" :key="idx">{{ account }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
</style>
