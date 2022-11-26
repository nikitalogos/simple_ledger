import { reactive, computed } from "vue"
import moment from "moment"

const timeline = reactive({
  max_duration: 1000 * 3600 * 24 * 30 * 12 * 10,  // 10 years in ms
  min_duration: 1000 * 60,  // 1 min in ms
  start_time: 0,
  duration: 0,
  now_time: 0,
})
timeline.end_time = computed(() => {
  return timeline.start_time + timeline.duration
})
timeline.start_mdate = computed(() => {
  return moment(timeline.start_time)
})
timeline.end_mdate = computed(() => {
  return moment(timeline.end_time)
})

timeline.reset_zoom = () => {
  timeline.duration = 1000 * 3600 * 24 * 10 // one day in ms
  timeline.start_time = Date.now() - timeline.duration * 0.0000001 // prevent flicker ("< now" -> "now")
}

setInterval(() => timeline.now_time = Date.now(), 100)

export function useTimeline() {
  return {timeline}
}
