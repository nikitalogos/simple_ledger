<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'
import { useTimeline } from 'src/composables/timeline.ts'

import YearLine from 'components/calendar/YearLine.vue'
import MonthLine from 'components/calendar/MonthLine.vue'
import DayLine from 'components/calendar/DayLine.vue'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  components: {
    YearLine,
    MonthLine,
    DayLine,
  },
  data (){
    return {
      tl: null,
      last_mouse_x: 0,
    }
  },
  computed: {
    now_line_x() {
      return (this.tl.now_time - this.tl.start_time) / this.tl.duration * this.el_width
    },
    now_text_x() {
      const text_width = 30
      const text_width_long = 45
      const margin = 5

      if (this.now_line_x < 0) {
        return margin
      } else if (this.now_line_x < this.el_width / 2) {
        return this.now_line_x + margin
      } else if (this.now_line_x < this.el_width) {
        return this.now_line_x - text_width - margin
      } else {
        return this.el_width - text_width_long - margin
      }
    },
    now_text() {
      return (this.now_line_x < 0 ? '< ' : '') + 'now' + (this.now_line_x < this.el_width ? '' : ' >')
    },
  },
  methods: {
    start_drag(event) {
      this.last_mouse_x = event.clientX

      // bind mouse events to resizer element until mouse up
      const element = event.target
      const pointer_id = event.pointerId
      element.setPointerCapture(pointer_id)

      window.addEventListener("pointermove", this.drag);
      window.addEventListener("pointerup", this.stop_drag);
    },
    drag (event) {
      const mouse_x = event.clientX
      const offset = mouse_x - this.last_mouse_x
      this.last_mouse_x = mouse_x

      this.tl.start_time -= offset / this.el_width * this.tl.duration
    },
    stop_drag (){
      window.removeEventListener("pointermove", this.drag);
      window.removeEventListener("pointerup", this.stop_drag);
    },

    zoom_in_out(event){
      let pivot = ((event.clientX - this.el_left) / this.el_width) * this.tl.duration

      let is_scroll_down = event.deltaY > 0
      let zoom_speed = 1.01
      let zoom_value = is_scroll_down ? zoom_speed : 1/zoom_speed
      const duration = this.tl.duration * zoom_value

      if (this.tl.min_duration < duration && duration < this.tl.max_duration) {
        this.tl.duration = duration
        this.tl.start_time += pivot * (1 - zoom_value)
      }
    },
    reset_zoom(){
      this.tl.start_time = Date.now()
      this.tl.duration = 1000 * 3600 * 24 * 10 // one day in ms
//      this.tl.duration = 1000 * 3600 * 24 * 30 * 3 // three months in ms
//      this.tl.duration = 1000 * 3600 * 24 * 30 * 12 * 2  // 2 years in ms
    },
    add_listener() {
      const el = document.getElementById(this.id)
      el.addEventListener('wheel', this.zoom_in_out)
    },
    fit_now() {
      this.tl.start_time = this.tl.now_time - this.tl.duration / 2
    },
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline
  },
  mounted(){
    this.reset_zoom()
    this.add_listener()
  },
});
</script>

<template>
  <div :id="id" class="gv-container" @pointerdown="start_drag($event)">
    {{ tl?.start_mdate.format('YYYY-MM-DD HH:mm') }} - {{ tl?.end_mdate.format('YYYY-MM-DD HH:mm') }}
    <YearLine/>
    <MonthLine/>
    <DayLine/>
    <div class="gv-canvas">
      <div class="now-line" :style="{left: now_line_x + 'px'}"></div>
      <div class="now-text" :style="{left: now_text_x + 'px'}" @dblclick="fit_now()">{{ now_text }}</div>
    </div>
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

    position: relative;
    overflow: hidden;

    .now-line {
      position: absolute;
      z-index: 100;
      height: 100%;
      width: 1px;
      top: 0;
      background-color: red;
    }
    .now-text {
      position: absolute;
      z-index: 100;
      top: 0;
      color: red;
      user-select: none;
    }
  }
}
</style>
