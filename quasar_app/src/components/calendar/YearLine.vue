<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

import { daysInYear, isLeapYear } from 'src/components/calendar/calendar_utils.js'


export default defineComponent({
  props: {
    start_mdate: {
      type: Object,
      required: true,
    },
    end_mdate: {
      type: Object,
      required: true,
    },
  },
  computed: {
    start_year(){
      return this.start_mdate.year()
    },
    end_year(){
      return this.end_mdate.year()
    },
    years() {
      const years = []
      for (let year = this.start_year; year <= this.end_year; year++){
        let fraction
        if (year === this.start_year) {
          if (year === this.end_year) {
            fraction = 1
          } else {
            const day_of_year = this.start_mdate.dayOfYear() // 1..365/366
            const total_days = daysInYear(year) // 365/366
            fraction = (total_days + 1 - day_of_year) / total_days // 0 < x <= 1
          }
        } else {
          if (year === this.end_year) {
            const day_of_year = this.end_mdate.dayOfYear() // 1..365/366
            const total_days = daysInYear(year) // 365/366
            fraction = day_of_year / total_days // 0 < x <= 1
          } else {
            fraction = 1
          }
        }

        years.push( {year, fraction} )
      }
      // flex-grow fix that if fractions sum < 1 two elements don't take up the full space
      if (years.length === 2){
        const fractions = [years[0].fraction, years[1].fraction]
        const divider =  Math.min(...fractions)
        years[0].fraction = fractions[0] / divider
        years[1].fraction = fractions[1] / divider
      }
      return years
    },
  },
  methods: {
    isLeapYear,
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
          leap_year: isLeapYear(year.year),
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
