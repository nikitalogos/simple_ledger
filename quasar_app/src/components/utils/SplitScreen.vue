<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'debounce'

export default defineComponent({
  props: {
    is_vertical: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    init_part1_size: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      el_width: null,
      el_height: null,
      part1_size: null,
      last_mouse_pos: null,
    }
  },
  computed: {
    full_id() {
      return `split_screen_${this.id}`
    },
    part2_size() {
      if (!this.el_width) {
        return null
      }
      const separator_width = 4
      const container_size = this.is_vertical ? this.el_height : this.el_width
      return container_size - this.part1_size - separator_width
    },
  },
  methods: {
    update_el_size() {
      const rect = document.getElementById(this.full_id)?.getBoundingClientRect()
      this.el_width = rect?.width
      this.el_height = rect?.height
    },
    start_drag(event) {
      this.last_mouse_pos = this.is_vertical ? event.clientY : event.clientX

      // bind mouse events to resizer element until mouse up
      const element = event.target
      const pointer_id = event.pointerId
      element.setPointerCapture(pointer_id)

      window.addEventListener("pointermove", this.drag);
      window.addEventListener("pointerup", this.stop_drag);
    },
    drag (event) {
      const mouse_pos = this.is_vertical ? event.clientY : event.clientX
      const offset = mouse_pos - this.last_mouse_pos
      this.last_mouse_pos = mouse_pos

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
    setInterval(this.update_el_size, 100)

    // make method
    this.save_part1_size = debounce((v) => localStorage.setItem(this.full_id, v), 100)

    const part1_size = localStorage.getItem(this.full_id)
    this.part1_size = part1_size ? Number(part1_size) : this.init_part1_size
  },
  mounted(){
    this.update_el_size()
  },
});
</script>

<template>
  <div class="split-screen-container" :class="{is_vertical: is_vertical}" :id="full_id">
    <div v-if="is_vertical" class="part top" :style="{height: `${part1_size}px`}">
      <slot name="part1"></slot>
    </div>
    <div v-else class="part left" :style="{width: `${part1_size}px`}">
      <slot name="part1"></slot>
    </div>

    <div class="separator" :class="{is_vertical: is_vertical}" @pointerdown="start_drag($event)"></div>

    <div v-if="is_vertical" class="part bottom" :style="{height: `${part2_size}px`}">
      <slot name="part1"></slot>
    </div>
    <div v-else class="part right" :style="{width: `${part2_size}px`}">
      <slot name="part2"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-screen-container {
  display: flex;
  width: 100%;
  height: 100%;
  border: 2px solid var(--border-color);
  margin: -2px;

  &.is_vertical {
    flex-direction: column;
  }

  .part {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    height: 100%;

    &.left {
      padding-right: 2px;
    }
    &.right {
      padding-left: 2px;
    }
    &.top {
      padding-bottom: 2px;
    }
    &.bottom {
      padding-top: 2px;
    }
  }

  .separator {
    align-self: stretch; // take up full height of flexbox container

    background-color: var(--border-color);

    z-index: 1000;

    &:hover {
      background-color: var(--control-color);
      cursor: col-resize;
    }
    &:hover.is_vertical {
      cursor: row-resize;
    }

    &.is_vertical {
      margin-top: -2px;
      margin-bottom: -2px;
      height: 4px;
      min-height: 4px;
    }
    &:not(.is_vertical) {
      margin-left: -2px;
      margin-right: -2px;
      width: 4px;
      min-width: 4px;
    }
  }
}
</style>
