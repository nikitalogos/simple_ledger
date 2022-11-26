import { reactive, computed } from "vue"

import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })
//import parse from 'src/text_parser/parser.js'

const editor = reactive({
  text: `
11.25 salary> 100k
11.26 salary> 10k
11.27 >food 30k
11.28 >beauty 50k
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
