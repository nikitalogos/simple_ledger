<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"

//import self_size_mixin from 'src/mixins/self_size_mixin.js'

function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}

export default defineComponent({
//  mixins: [
//    self_size_mixin,
//  ],
  props: {
    start_date: {
      type: Object,
      required: true,
    },
    end_date: {
      type: Object,
      required: true,
    },
  },
  computed: {
    start_year(){
      return this.start_date.getFullYear()
    },
    end_year(){
      return this.end_date.getFullYear()
    },
    years() {
      const years = []
      for (let i = this.start_year; i <= this.end_year; i++){
        years.push(i)
      }
      return years
    },
    fractions() {
      const fractions = []
      for (let i = this.start_year; i <= this.end_year; i++){
        let fraction
        if (i === this.start_year) {
          if (i === this.end_year) {
            fraction = 1
          } else {
            const start_mdate = moment(this.start_date)
            const day_of_year = start_mdate.dayOfYear() // 1..365/366
            const total_days = daysInYear(start_mdate.year()) // 365/366
            fraction = (total_days + 1 - day_of_year) / total_days // 0 < x <= 1
          }
        } else {
          if (i === this.end_year) {
            const end_mdate = moment(this.end_date)
            const day_of_year = end_mdate.dayOfYear() // 1..365/366
            const total_days = daysInYear(end_mdate.year()) // 365/366
            fraction = day_of_year / total_days // 0 < x <= 1
          } else {
            fraction = 1
          }
        }
        fractions.push(fraction)
      }
      return fractions
    },
  }
});
</script>

<template>
  <div class="cal-years">
    <div class="cal-year" v-for="(year, idx) in years" :key="idx" :style="{flex: fractions[idx]}">
      {{ year }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.cal-years {
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 1rem;

  .cal-year {
    overflow-x: hidden;

    border-right: 1px solid;

    text-align: center;
  }
}
</style>
