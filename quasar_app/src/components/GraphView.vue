<script lang="ts">
import { defineComponent } from 'vue';

import self_size_mixin from 'src/mixins/self_size_mixin.js'

import CalendarLine from 'components/calendar/CalendarLine.vue'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  components: {
    CalendarLine,
  }
});
</script>

<template>
  <div :id="id" class="gv-container">
    <CalendarLine/>
    <div class="gv-canvas">eee</div>
  </div>
</template>

<style scoped lang="scss">
.gv-container {
  display: flex;
  flex-direction: column;

  height: 100%;

  .gv-canvas {
    background-color: white;

    width: 100%;
    height: 100%;
  }
}
</style>
