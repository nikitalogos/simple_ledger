<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useTimeline } from 'src/composables/timeline.ts'

import calendar_navigation_mixin from 'components/calendar/calendar_navigation_mixin.js'
import YearLine from 'components/calendar/YearLine.vue'
import MonthLine from 'components/calendar/MonthLine.vue'
import DayLine from 'components/calendar/DayLine.vue'
import GraphCanvas from 'components/graph/GraphCanvas.vue'

export default defineComponent({
  mixins: [
    self_size_mixin,
    calendar_navigation_mixin,
  ],
  components: {
    YearLine,
    MonthLine,
    DayLine,
    GraphCanvas,
  },
});
</script>

<template>
  <div :id="id" class="gv-h-container" @pointerdown="start_drag($event)">
    <div class="gv-y"></div>
    <div class="gv-v-container">
      {{ tl?.start_mdate.format('YYYY-MM-DD HH:mm') }} - {{ tl?.end_mdate.format('YYYY-MM-DD HH:mm') }}
      <YearLine/>
      <MonthLine/>
      <DayLine/>
      <GraphCanvas :id="`${id}_graph_canvas`"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gv-h-container {
  display: flex;
  flex-direction: row;
  height: 100%;

  .gv-y {
    width: 30px;
  }

  .gv-v-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: calc(100% - 30px);
  }
}
</style>
