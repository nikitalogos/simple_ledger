<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import calendar_line_mixin from 'src/components/calendar/calendar_line_mixin.js'


export default defineComponent({
  mixins: [
    calendar_line_mixin,
  ],
  computed: {
    months() {
      const months = []
      for (let year = this.start_year; year <= this.end_year; year++){
        for (let month = 0; month < 12; month++){
          if (year === this.start_year && month < this.start_month){
            continue
          }
          if (year === this.end_year && month > this.end_month){
            continue
          }

          const is_first = (year === this.start_year && month === this.start_month)
          const is_last = (year === this.end_year && month === this.end_month)

          const mdate = is_last? this.tl.end_mdate.clone() : this.tl.start_mdate.clone()
          mdate.set({year, month})
          const fraction = this.calc_fraction_ms('month', is_first, is_last, mdate)

          const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]

          months.push( {year, month, fraction, month_str} )
        }
      }
      return months
    },
  },
  methods: {
    is_this_month(year, month){
      const m = moment()
      return m.year() === year && m.month() === month
    },
    is_long_month(year, month){
      return this.days_in_month(year, month) === 31
    },
    fit(year, month) {
      this.tl.start_time = moment([year, month]).valueOf()
      this.tl.duration = 1000 * 3600 * 24 * this.days_in_month(year, month)
    },
  }
});
</script>

<template>
  <div class="cal-months">
    <div
      class="cal-month"
      v-for="(month, idx) in months"
      :key="idx"
      :style="{flex: month.fraction}"
    >
      <span
        :class="{
          this_month: is_this_month(month.year, month.month),
          long_month: is_long_month(month.year, month.month)
        }"
        @dblclick="fit(month.year, month.month)"
      >
        {{ month.month_str }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cal-months {
  display: flex;
  flex-direction: row;
  align-items: center;

  line-height: 1.1rem;

  .cal-month {
    box-sizing: border-box;
    overflow: hidden;

    &:not(:last-child) {
      border-right: 1px solid;
    }

    user-select: none;

    text-align: center;

    .this_month {
      color: var(--highlight-color);
      font-weight: bold;
    }
    .long_month {
      text-decoration: underline;
    }
  }
}
</style>
