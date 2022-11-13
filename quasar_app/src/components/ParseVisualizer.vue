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
  created() {
    const { settings } = useSettings()
    this.settings = settings
  },
});
</script>

<template>
  <div class="tr-list">
    <div class="tr-item"  v-for="(transaction, idx) in settings.parse_tree" :key="idx">
      <div class="tr-part date label">{{ moment(transaction.date_expr.date).format('ddd, YYYY MMM Do') }}</div>
      <div class="tr-part account label">{{ transaction.account_expr.acc_from }}</div>
      <div class="tr-part">{{ "➞" }}</div>
      <div class="tr-part account label">{{ transaction.account_expr.acc_to }}</div>
      <div class="tr-part amount label">{{ `${format_float(transaction.amount_expr.amount)} ${transaction.amount_expr.currency}` }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tr-list {
  font-size: 0.85rem;

  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 20px;

  .tr-item {
    display: flex;
    flex-direction: row;

    .tr-part {
      margin-right: 10px;
    }

    .date { color: #fc0; }
    .account { color: #f60; }
    .amount { color: #66f; }
  }
}
</style>
