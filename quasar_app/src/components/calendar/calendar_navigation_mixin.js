import { useTimeline } from 'src/composables/timeline.ts'

// requires "self_size_mixin"
// interface:
// 1. start_drag - @pointerdown="start_drag($event)"
// 2. reset_zoom - @click="reset_zoom()"

export default {
  data (){
    return {
      tl: null,
      _last_mouse_x: 0,
    }
  },
  methods: {
    start_drag(event) {
      this._last_mouse_x = event.clientX

      // bind mouse events to resizer element until mouse up
      const element = event.target
      const pointer_id = event.pointerId
      element.setPointerCapture(pointer_id)

      window.addEventListener("pointermove", this._drag);
      window.addEventListener("pointerup", this._stop_drag);
    },
    _drag (event) {
      const mouse_x = event.clientX
      const offset = mouse_x - this._last_mouse_x
      this._last_mouse_x = mouse_x

      this.tl.start_time -= offset / this.el_width * this.tl.duration
    },
    _stop_drag (){
      window.removeEventListener("pointermove", this._drag);
      window.removeEventListener("pointerup", this._stop_drag);
    },

    _zoom_in_out(event){
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
      this.tl.duration = 1000 * 3600 * 24 * 10 // one day in ms
//      this.tl.duration = 1000 * 3600 * 24 * 30 * 3 // three months in ms
//      this.tl.duration = 1000 * 3600 * 24 * 30 * 12 * 2  // 2 years in ms

      this.tl.start_time = Date.now() - this.tl.duration * 0.0000001 // prevent flicker ("< now" -> "now")
    },
    _add_listener() {
      const el = document.getElementById(this.id)
      el.addEventListener('wheel', this._zoom_in_out)
    },
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline
  },
  mounted(){
    this.reset_zoom()
    this._add_listener()
  },
}
