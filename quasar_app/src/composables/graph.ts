import { reactive, computed } from "vue"

const graph = reactive({
  padding_v_px: 10,
  tick_height_px: 20,
  min_value: 0,
  max_value: 0,
})

export function useGraph() {
  return {graph}
}
