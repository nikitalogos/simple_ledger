<script lang="ts">
import { defineComponent } from 'vue';
import moment from "moment"


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
    start_month(){
      return this.start_mdate.month()
    },
    end_month(){
      return this.end_mdate.month()
    },

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
              const day_of_month = this.start_mdate.date() // 1..31
              const total_days = this.start_mdate.daysInMonth() // 28..31
              fraction = (total_days + 1 - day_of_month) / total_days // 0 < x <= 1
            }
          } else {
            if (is_last_month) {
              const day_of_month = this.end_mdate.date() // 1..31
              const total_days = this.end_mdate.daysInMonth() // 28..31
              fraction = day_of_month / total_days // 0 < x <= 1
            } else {
              fraction = 1
            }
          }
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

  height: 1rem;

  .cal-month {
    box-sizing: border-box;
    border-right: 1px solid;
    overflow-x: hidden;

    user-select: none;

    text-align: center;

    .this_month {
      color: var(--highlight-color);
      font-weight: bold;
    }
  }
}
</style>
