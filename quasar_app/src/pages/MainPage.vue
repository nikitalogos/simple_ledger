<template>
  <div class="h-flex">
    <TextEditor/>
    <ParseVisualizer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextEditor from 'components/TextEditor.vue'
import ParseVisualizer from 'components/ParseVisualizer.vue'
import ParseTree from 'components/ParseTree.vue'

export default defineComponent({
  components: {
    TextEditor,
    ParseVisualizer,
  }
});
</script>

<style scoped lang="scss">

.h-flex {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: start;

  width: 100%;
  padding: 20px;
}

</style>
