<script lang="ts">
import { defineComponent } from 'vue';

import { useSettings } from 'src/composables/settings.ts'

export default defineComponent({
  data() {
    return {
      settings: null,
    }
  },
  created() {
    const { settings } = useSettings()
    this.settings = settings
  },
});
</script>

<template>
  <json-viewer
      class=".json-viewer-custom-theme"
      :value="settings.parse_tree"
      :expand-depth=1000
      expanded
      sort></json-viewer>
</template>

<style scoped lang="scss">
</style>
