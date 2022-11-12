<template>
  <div>
    Hello world!

    <TestWidget/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TestWidget from 'components/TestWidget.vue'

export default defineComponent({
  components: {
    TestWidget,
  }
});
</script>
