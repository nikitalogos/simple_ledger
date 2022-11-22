<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import calendar_line_mixin from 'src/components/calendar/calendar_line_mixin.js'


export default defineComponent({
  mixins: [
    calendar_line_mixin,
  ],
  computed: {
    years() {
      const years = []
      for (let year = this.start_year; year <= this.end_year; year++){
        let fraction
        if (year === this.start_year) {
          if (year === this.end_year) {
            fraction = 1
          } else {
            fraction = this.calc_fraction('year', true, this.start_mdate)
          }
        } else {
          if (year === this.end_year) {
            fraction = this.calc_fraction('year', false, this.end_mdate)
          } else {
            fraction = 1
          }
        }

        years.push( {year, fraction} )
      }
      this.fix_fractions_if_2_items(years)
      return years
    },
  },
  methods: {
    is_this_year(year){
      return moment().year() === year
    }
  }
});
</script>

<template>
  <div class="cal-years">
    <div
      class="cal-year"
      v-for="(year, idx) in years"
      :key="idx"
      :style="{flex: year.fraction}"
    >
      <div
        :class="{
          this_year: is_this_year(year.year),
          leap_year: is_leap_year(year.year),
        }"
      >
        {{ year.year }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cal-years {
  display: flex;
  flex-direction: row;
  align-items: center;

  .cal-year {
    box-sizing: border-box;
    border-right: 1px solid;
    overflow-x: hidden;

    user-select: none;

    text-align: center;

    .this_year {
      color: var(--highlight-color);
      font-weight: bold;
    }
    .leap_year {
      text-decoration: underline;
    }
  }
}
</style>
