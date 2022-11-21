<script lang="ts">
import { defineComponent } from 'vue';

import YearLine from 'components/calendar/YearLine.vue'

export default defineComponent({
  components: {
    YearLine,
  }
});
</script>

<template>
  <YearLine :start_date="new Date()" :end_date="new Date('2035-10')" />
</template>

<style scoped lang="scss">
.cal-year {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 1rem;

}
</style>
