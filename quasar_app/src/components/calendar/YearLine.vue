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
        const is_first = (year === this.start_year)
        const is_last = (year === this.end_year)

        const mdate = is_last? this.tl.end_mdate.clone() : this.tl.start_mdate.clone()
        mdate.set({year})
        const fraction = this.calc_fraction_ms('year', is_first, is_last, mdate)

        years.push( {year, fraction} )
      }
      return years
    },
  },
  methods: {
    is_this_year(year){
      return moment().year() === year
    },
    fit(year) {
      this.tl.start_time = moment([year]).valueOf()
      this.tl.duration = 1000 * 3600 * 24 * this.days_in_year(year)
    },
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
      <span
        class="text"
        :class="{
          this_year: is_this_year(year.year),
          leap_year: is_leap_year(year.year),
        }"
        @dblclick="fit(year.year)"
      >
        {{ year.year }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cal-years {
  display: flex;
  flex-direction: row;
  align-items: center;

  line-height: var(--calendar-line-height);

  .cal-year {
    box-sizing: border-box;
    overflow: hidden;

    &:not(:last-child) {
      border-right: 1px solid;
    }

    user-select: none;

    text-align: center;

    .text {
      cursor: pointer;
    }
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
