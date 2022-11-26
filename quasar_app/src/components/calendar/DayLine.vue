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

            const is_first = (year === this.start_year && month === this.start_month && day === this.start_day)
            const is_last = (year === this.end_year && month === this.end_month && day === this.end_day)

            const mdate = is_last? this.tl.end_mdate.clone() : this.tl.start_mdate.clone()
            mdate.set({year, month, day})
            const fraction = this.calc_fraction_ms('day', is_first, is_last, mdate)

            const is_weekend = this.is_weekend(mdate)

            days.push( {year, month, day, fraction, is_weekend} )
          }
        }
      }
      return days
    },
  },
  methods: {
    is_this_day(year, month, day){
      const m = moment()
      return m.year() === year && m.month() === month && m.date() === day
    },
    is_weekend(mdate){
      return mdate.day() > 4 // day of week in 5-sat or 6-sun
    },
    fit(year, month, day) {
      this.tl.start_time = moment([year, month, day]).valueOf()
      this.tl.duration = 1000 * 3600 * 24
    },
  },
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
        class="text"
        :class="{
          this_day: is_this_day(day.year, day.month, day.day),
          weekend: day.is_weekend,
        }"
        @dblclick="fit(day.year, day.month, day.day)"
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

  line-height: var(--calendar-line-height);

  .cal-day {
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
