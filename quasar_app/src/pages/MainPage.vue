<template>
  <SplitScreen :is_vertical="false" id="h1">
    <template v-slot:part1>
      <TextEditor/>
    </template>
    <template v-slot:part2>
      <SplitScreen :is_vertical="true" id="h2">
        <template v-slot:part1> <ParseVisualizer/> </template>
        <template v-slot:part2> <ParseVisualizer/> </template>
      </SplitScreen>
    </template>
  </SplitScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SplitScreen from 'components/utils/SplitScreen.vue'
import TextEditor from 'components/TextEditor.vue'
import ParseVisualizer from 'components/ParseVisualizer.vue'
import ParseTree from 'components/ParseTree.vue'

export default defineComponent({
  components: {
    SplitScreen,
    TextEditor,
    ParseVisualizer,
  }
});
</script>

<style scoped lang="scss">
</style>
