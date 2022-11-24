import { useTimeline } from 'src/composables/timeline.ts'

export default {
  data (){
    return {
      tl: null,
    }
  },
  computed: {
    start_year(){
      return this.tl.start_mdate.year()
    },
    end_year(){
      return this.tl.end_mdate.year()
    },
    start_month(){
      return this.tl.start_mdate.month()
    },
    end_month(){
      return this.tl.end_mdate.month()
    },
    start_day(){
      return this.tl.start_mdate.date()
    },
    end_day(){
      return this.tl.end_mdate.date()
    },
  },
  methods: {
    days_in_year(year) {
      return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
    },
    is_leap_year(year) {
      return this.days_in_year(year) === 366
    },
    days_in_month(year, month) {
      return {
        0: 31,
        1: this.is_leap_year(year) ? 29 : 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31
      }[month]
    },
    calc_fraction_ms(unit, is_first, is_last, mdate) {
      const mdate2 = mdate.clone()

      let total_ms
      if (unit === 'day') {
        mdate2.set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        total_ms = 1000 * 3600 * 24
      } else if (unit === 'month') {
        mdate2.set({
          date: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        total_ms = 1000 * 3600 * 24 * mdate.daysInMonth()
      } else if (unit === 'year') {
        mdate2.set({
          month: 0,
          date: 1,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        })
        total_ms = 1000 * 3600 * 24 * this.days_in_year(mdate.year())
      }

      const diff_ms = (mdate.unix() - mdate2.unix()) * 1000 + mdate.millisecond()

      if (is_first){
        return total_ms + 1 - diff_ms
      } else if (is_last) {
        return diff_ms
      } else {
        return total_ms
      }
    },
  },
  created(){
    const { timeline } = useTimeline()
    this.tl = timeline
  },
}
