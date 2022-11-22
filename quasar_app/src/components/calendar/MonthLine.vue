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

          let fraction
          const is_first_month = (year === this.start_year && month === this.start_month)
          const is_last_month = (year === this.end_year && month === this.end_month)

          if (is_first_month) {
            if (is_last_month) {
              fraction = 1
            } else {
              fraction = this.calc_fraction('month', true, this.start_mdate)
            }
          } else {
            if (is_last_month) {
              fraction = this.calc_fraction('month', false, this.end_mdate)
            } else {
              fraction = 1
            }
          }
          const month_str = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]

          months.push( {year, month, fraction, month_str} )
        }
      }
      this.fix_fractions_if_2_items(months)
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
    }
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
    border-right: 1px solid;
    overflow: hidden;

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
