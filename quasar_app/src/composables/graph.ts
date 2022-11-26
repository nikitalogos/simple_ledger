import { reactive, computed } from "vue"

const graph = reactive({
  padding_v_px: 10,
  tick_height_px: 50,

  canvas_el_height: 0,
  points_num: 0,
  min_value: 0,
  max_value: 0,
})
graph.spread = computed(() => {
  return graph.max_value - graph.min_value  + 1e-30 // prevent zero division
})

graph.update_on_points_change = (points) => {
  const sums = points.map((point) => point.sum)
  graph.min_value = Math.min(...sums)
  graph.max_value = Math.max(...sums)

  graph.points_num = points.length
}
graph.value_to_y = (value, el_height) => {
  const value_normed = (value - graph.min_value) / graph.spread
  const y = (1 - value_normed) * (el_height - graph.padding_v_px * 2) + graph.padding_v_px
  return y
}

graph.ticks = computed(() => {
  if (!graph.canvas_el_height){
    return []
  }
  const max_ticks_num = Math.floor(graph.canvas_el_height / graph.tick_height_px)
  if (max_ticks_num === 0){
    return []
  }
  if (graph.points_num === 0) {
    return []
  }
  const min_step = graph.spread / max_ticks_num

  const log10_int = Math.floor(Math.log10(min_step))
  const first_digit = Math.floor(min_step / 10 ** log10_int)
  const tick_step = [1, 2, 5, 5, 5, 10, 10, 10, 10, 10][first_digit] * 10 ** log10_int

  let first_tick = Math.floor(graph.min_value / tick_step) * tick_step
  if (first_tick < graph.min_value) {
    first_tick += tick_step
  }

  const ticks = []
  for (let value = first_tick; value < graph.max_value; value += tick_step) {
    let text
    if (value === 0) {
      text = value + ''
    } else if (tick_step > 1e5) {
      text = (value / 1e6) + 'm'
    } else if (tick_step > 1e2) {
      text = (value / 1e3) + 'k'
    } else {
      text = value + ''
    }

    const y = graph.value_to_y(value, graph.canvas_el_height)
    ticks.push({
      text,
      y,
    })
  }
  return ticks
})


export function useGraph() {
  return {graph}
}
