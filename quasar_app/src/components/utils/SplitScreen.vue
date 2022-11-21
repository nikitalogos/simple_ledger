<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from 'debounce'

import self_size_mixin from 'src/mixins/self_size_mixin.js'

export default defineComponent({
  mixins: [
    self_size_mixin,
  ],
  props: {
    is_vertical: {
      type: Boolean,
      required: true,
    },
    init_part1_size: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      part1_size: null,
      last_mouse_pos: null,
    }
  },
  computed: {
    part2_size() {
      if (!this.el_width) {
        return null
      }
      const container_size = this.is_vertical ? this.el_height : this.el_width
      return container_size - this.part1_size
    },
  },
  methods: {
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
    // make method
    this.save_part1_size = debounce((v) => localStorage.setItem(this.id, v), 100)

    const part1_size = localStorage.getItem(this.id)
    this.part1_size = part1_size ? Number(part1_size) : this.init_part1_size
  },
});
</script>

<template>
  <div class="split-screen-container" :class="{is_vertical: is_vertical}" :id="id">
    <div v-if="is_vertical" class="part top" :style="{height: `${part1_size}px`}">
      <slot name="part1"></slot>
    </div>
    <div v-else class="part left" :style="{width: `${part1_size}px`}">
      <slot name="part1"></slot>
    </div>

    <div class="separator" :class="{is_vertical: is_vertical}" @pointerdown="start_drag($event)"></div>

    <div v-if="is_vertical" class="part bottom" :style="{height: `${part2_size}px`}">
      <slot name="part2"></slot>
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

  &.is_vertical {
    flex-direction: column;
  }

  .part {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);

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
