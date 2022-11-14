<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'debounce'

import { useScreenSizes } from 'src/composables/screen_sizes.ts'

export default defineComponent({
  props: {
    is_vertical: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      part1_size: null,
      last_mouse_x: null,
    }
  },
  computed: {
    local_storage_key() {
      return `${this.id}_part1_size`
    },
    part2_size() {
      const separator_width = 10
      return this.screen_sizes.client_w - this.part1_size - separator_width
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
      const offset = event.clientX - this.last_mouse_x
      this.last_mouse_x = event.clientX

      this.part1_size += offset
    },
    stop_drag (){
      window.removeEventListener("pointermove", this.drag);
      window.removeEventListener("pointerup", this.stop_drag);
    },
  },
  watch: {
    // save preferences before end session
    part1_size(new_value) {
      this.save_part1_size(new_value)
    }
  },
  created() {
    const { screen_sizes } = useScreenSizes()
    this.screen_sizes = screen_sizes

    // make method
    this.save_part1_size = debounce((v) => localStorage.setItem(this.local_storage_key, v), 100)

    const part1_size = localStorage.getItem(this.local_storage_key)
    this.part1_size = part1_size ? Number(part1_size) : 600
  },
});
</script>

<template>
  <div class="split-screen-container">
    <div class="part" :style="{width: `${part1_size}px`}">
      <slot name="part1"></slot>
    </div>
    <div class="separator" @pointerdown="start_drag($event)"></div>
    <div class="part" :style="{width: `${part2_size}px`}">
      <slot name="part2"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-screen-container {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-color);

  .part {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    height: 100%;
    padding: 2px;
  }

  .separator {
    margin-left: -2px;
    margin-right: -2px;
    width: 4px;
    min-width: 4px;
    align-self: stretch; // take up full height of flexbox container

    background-color: var(--border-color);

    &:hover {
      background-color: var(--control-color);
      cursor: col-resize;
    }
  }
}
</style>
