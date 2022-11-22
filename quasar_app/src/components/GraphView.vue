<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import self_size_mixin from 'src/mixins/self_size_mixin.js'

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
      max_duration: 1000 * 3600 * 24 * 30 * 12 * 10,  // 10 years in ms
      duration: 0,
      start_time: 0,
      last_mouse_x: 0,
    }
  },
  computed: {
    end_time(){
      return this.start_time + this.duration
    },
    start_mdate(){
      return moment(this.start_time)
    },
    end_mdate(){
      return moment(this.end_time)
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

      this.start_time -= offset / this.el_width * this.duration
    },
    stop_drag (){
      window.removeEventListener("pointermove", this.drag);
      window.removeEventListener("pointerup", this.stop_drag);
    },

    zoom_in_out(event){
      let pivot = ((event.clientX - this.el_left) / this.el_width) * this.duration

      let is_scroll_down = event.deltaY > 0
      let zoom_speed = 1.01
      let zoom_value = is_scroll_down ? zoom_speed : 1/zoom_speed
      const duration = this.duration * zoom_value

      if (duration < this.max_duration) {
        this.duration = duration
        this.start_time += pivot * (1 - zoom_value)
      }
    },
    reset_zoom(){
      this.start_time = Date.now()
//      this.duration = 1000 * 3600 * 24  // one day in ms
      this.duration = 1000 * 3600 * 24 * 30 * 3 // three months in ms
//      this.duration = 1000 * 3600 * 24 * 30 * 12 * 2  // 2 years in ms
    },
    add_listener() {
      const el = document.getElementById(this.id)
      el.addEventListener('wheel', this.zoom_in_out)
    }
  },
  mounted(){
    this.reset_zoom()
    this.add_listener()
  },
});
</script>

<template>
  <div :id="id" class="gv-container" @pointerdown="start_drag($event)">
    {{ start_mdate.format('YYYY-MM-DD') }} - {{ end_mdate.format('YYYY-MM-DD') }}
    <YearLine :start_mdate="start_mdate" :end_mdate="end_mdate"/>
    <MonthLine :start_mdate="start_mdate" :end_mdate="end_mdate"/>
    <DayLine :start_mdate="start_mdate" :end_mdate="end_mdate"/>
    <div class="gv-canvas"></div>
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
