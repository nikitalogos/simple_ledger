<script lang="ts">
import { defineComponent } from 'vue';

import { useEditor } from 'src/composables/editor.ts'

export default defineComponent({
  data() {
    return {
      editor: null,
    }
  },
  created() {
    const { editor } = useEditor()
    this.editor = editor
  },
});
</script>

<template>
  <json-viewer
      class=".json-viewer-custom-theme"
      :value="editor.parse_tree"
      :expand-depth=1000
      expanded
      sort></json-viewer>
</template>

<style scoped lang="scss">
</style>
