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
  <textarea v-model="settings.text"></textarea>
</template>

<style scoped lang="scss">
textarea {
  width: 100%;
  height: 100%;
}
</style>
