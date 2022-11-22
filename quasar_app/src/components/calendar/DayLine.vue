<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import calendar_line_mixin from 'src/components/calendar/calendar_line_mixin.js'


export default defineComponent({
  mixins: [
    calendar_line_mixin,
  ],
  computed: {
    days() {
      const days = []
      for (let year = this.start_year; year <= this.end_year; year++){
        for (let month = 0; month < 12; month++){
          for (let day = 1; day <= this.days_in_month(year, month); day++){
            if (year === this.start_year && month < this.start_month){
              continue
            }
            if (year === this.end_year && month > this.end_month){
              continue
            }
            if (year === this.start_year && month === this.start_month && day < this.start_day){
              continue
            }
            if (year === this.end_year && month === this.end_month && day > this.end_day){
              continue
            }

            let fraction
            const is_first_day = (year === this.start_year && month === this.start_month && day === this.start_day)
            const is_last_day = (year === this.end_year && month === this.end_month && day === this.end_day)

            if (is_first_day) {
              if (is_last_day) {
                fraction = 1
              } else {
                fraction = this.calc_fraction('day', true, this.start_mdate)
              }
            } else {
              if (is_last_day) {
                fraction = this.calc_fraction('day', false, this.end_mdate)
              } else {
                fraction = 1
              }
            }

            days.push( {year, month, day, fraction} )
          }
        }
      }
      this.fix_fractions_if_2_items(days)
      return days
    },
  },
  methods: {
    is_this_day(year, month, day){
      const m = moment()
      return m.year() === year && m.month() === month && m.date() === day
    },
    is_weekend(year, month, day){
      return false
    }
  }
});
</script>

<template>
  <div class="cal-days">
    <div
      class="cal-day"
      v-for="(day, idx) in days"
      :key="idx"
      :style="{flex: day.fraction}"
    >
      <span
        :class="{
          this_day: is_this_day(day.year, day.month, day.day),
          weekend: is_weekend(day.year, day.month, day.day)
        }"
      >
        {{ day.day }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cal-days {
  display: flex;
  flex-direction: row;
  align-items: center;

  line-height: 1.1rem;

  .cal-day {
    box-sizing: border-box;
    border-right: 1px solid;
    overflow: hidden;

    user-select: none;

    text-align: center;

    .this_day {
      color: var(--highlight-color);
      font-weight: bold;
    }
    .weekend {
      text-decoration: underline;
    }
  }
}
</style>
