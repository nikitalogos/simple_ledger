import { reactive, computed } from "vue"

import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })
//import parse from 'src/text_parser/parser.js'

const editor = reactive({
  text: `
# 11.27 >null 1k
11.24 salary> 6.5
11.25 salary> 33
11.26 salary> 13
11.27 salary> 100
11.28 salary> 200
11.29 salary> 500
11.30 salary> 1k
12.01 salary> 3.5k
12.02 salary> 8k
12.03 salary> 20k
12.04 salary> 100k
12.05 >beauty 1m
`
})
editor.parse_tree = computed(() => {
  const p = parse(editor.text)
  console.log('p', p)
  return p
})
editor.transactions = computed(() => {
  const transactions = []
  editor.parse_tree.forEach((item) => {
    const date_expr = item.date_expr
    const account_expr = item.account_expr
    const amount_expr = item.amount_expr

    if (!date_expr || date_expr.error || !account_expr || !amount_expr) {
      return
    }
    if (account_expr.acc_from === account_expr.acc_to) {
      return
    }
    if (amount_expr.amount === 0) {
      return
    }
    transactions.push({
      mdate: date_expr.mdate,
      time: date_expr.mdate.valueOf(),

      acc_from: account_expr.acc_from,
      acc_to: account_expr.acc_to,
      amount: amount_expr.amount,
      currency: amount_expr.currency,
    })
  })
  return transactions
})

export function useEditor() {
  return {editor}
}
