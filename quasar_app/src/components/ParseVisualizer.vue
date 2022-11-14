<script lang="ts">
import { defineComponent } from 'vue';

import { useSettings } from 'src/composables/settings.ts'
import moment from "moment"

export default defineComponent({
  data() {
    return {
      settings: null,
    }
  },
  methods: {
    moment,
    format_float(value) {
      let value_str = value + ''
      let list = value_str.split('.')
      let int_part = list[0]

      for (let i = int_part.length - 3; i > 0; i -= 3) {
        int_part = int_part.slice(0, i) + ',' + int_part.slice(i)
      }
      list[0] = int_part
      value_str = list.join('.')
      return value_str
    },
  },
  computed: {
    transactions_formatted() {
      return this.settings.parse_tree.map((transaction) => {
        const date_expr = transaction.date_expr
        const account_expr = transaction.account_expr
        const amount_expr = transaction.amount_expr

        let date = 'date?'
        if (date_expr) {
          const mdate = moment(date_expr.date)
          const date_abs = mdate.format('ddd, YYYY MMM Do')
          let date_rel = mdate.calendar(null, {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastDay: '[Yesterday]',
              nextWeek: '[]',
              lastWeek: '[]',
              sameElse: '[]'
          })
          date_rel = date_rel || mdate.from(moment().startOf('day'))

          date = `${date_abs} (${date_rel})`
        }

        const result = {
          date: {
            is_valid: !!date_expr,
            text: date,
          },
          acc_from: {
            is_valid: !!account_expr,
            text: account_expr ? account_expr.acc_from : 'from?',
          },
          acc_to: {
            is_valid: !!account_expr,
            text: account_expr ? account_expr.acc_to : 'from?',
          },
          amount: {
            is_valid: !!amount_expr,
            text: amount_expr ? `${this.format_float(amount_expr.amount)} ${amount_expr.currency}` : 'amount?',
          },
        }
        result.is_visible = Object.keys(result).some((key) => result[key].is_valid)
        return result
      })
    }
  },
  created() {
    const { settings } = useSettings()
    this.settings = settings
  },
});
</script>

<template>
  <div class="tr-list">
    <div v-for="(transaction, idx) in transactions_formatted" :key="idx">
      <div v-if="transaction.is_visible" class="tr-item">
        <div
          class="tr-part date label"
          :class="{disabled: !transaction.date.is_valid}"
        >{{ transaction.date.text }}</div>
        <div
          class="tr-part account label"
          :class="{disabled: !transaction.acc_from.is_valid}"
        >{{ transaction.acc_from.text }}</div>
        <div
          class="tr-part"
        >{{ "➞" }}</div>
        <div
          class="tr-part account label"
          :class="{disabled: !transaction.acc_to.is_valid}"
        >{{ transaction.acc_to.text }}</div>
        <div
          class="tr-part amount label"
          :class="{disabled: !transaction.amount.is_valid}"
        >{{ transaction.amount.text }}</div>
      </div>
      <div v-else class="tr-item">
        <pre> </pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tr-list {
  font-size: 0.85rem;

  display: flex;
  flex-direction: column;

  overflow-x: scroll;

  .tr-item {
    display: flex;
    flex-direction: row;
    height: 1.5rem;
    padding: 2px;

    white-space: nowrap;

    .tr-part {
      margin-right: 10px;
    }

    .date { color: #fc0; }
    .account { color: #f60; }
    .amount { color: #66f; }
  }
}
</style>
