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
  <textarea v-model="editor.text"></textarea>
</template>

<style scoped lang="scss">
textarea {
  width: 100%;
  height: 100%;
}
</style>
