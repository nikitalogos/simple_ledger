<template>
  <SplitScreen style="height: 100vh" :is_vertical="false" id="split_screen_h">

    <template v-slot:part1>
      <AccountsPartition/>
    </template>
    <template v-slot:part2>
      <SplitScreen :is_vertical="true" id="split_screen_h2_v">

        <template v-slot:part1>
          <SplitScreen :is_vertical="false" id="split_screen_h2_v1_h">

            <template v-slot:part1> <TextEditor/> </template>
            <template v-slot:part2> <ParseVisualizer/> </template>

          </SplitScreen>
        </template>
        <template v-slot:part2>
          <SplitScreen :is_vertical="false" id="split_screen_h2_v2_h">

            <template v-slot:part1> <GraphView id="graph_view"/>  </template>
            <template v-slot:part2>
              <div class="label" style="width: fit-content" @click="tl.reset_zoom()">Reset zoom</div>
            </template>

          </SplitScreen>
        </template>

      </SplitScreen>
    </template>

  </SplitScreen>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SplitScreen from 'components/utils/SplitScreen.vue'

import AccountsPartition from 'components/AccountsPartition.vue'
import TextEditor from 'components/TextEditor.vue'
import ParseVisualizer from 'components/ParseVisualizer.vue'
import GraphView from 'components/GraphView.vue'

import ParseTree from 'components/ParseTree.vue'

import { useTimeline } from 'src/composables/timeline.ts'

export default defineComponent({
  components: {
    SplitScreen,

    AccountsPartition,
    TextEditor,
    ParseVisualizer,
    GraphView,

//    ParseTree,
  },
  data (){
    return {
      tl: null,
    }
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline
  },
});
</script>

<style scoped lang="scss">
</style>
