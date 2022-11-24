import { reactive, computed } from "vue"

import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })
//import parse from 'src/text_parser/parser.js'

const editor = reactive({
  text: `
# Planning

10.16
    - >cash 2800 ils
    - >cibus 0 ils

?? 17% tax in the hotel - 3355 x 60 x 0.17 = 34k = 1500 ils

10.31 salary> 13k ils
11.03 premia > 275k rub
11.03 salary > 49k rub
11.03 > oleg_solodovnik 334.5k rub

---

11.15 salary > 4.8k ils

11.15 ticket_chargeback > 60k rub (3278 ils)

11.25 >cibus 1300 ils

`
})
editor.parse_tree = computed(() => {
  const p = parse(editor.text)
  console.log('p', p)
  return p
})
editor.transactions = computed(() => {
  const transactions = []
  this.editor.parse_tree.forEach((item) => {
    const date_expr = item.date_expr
    const account_expr = item.account_expr
    const amount_expr = item.amount_expr

    if (!date_expr || date_expr.error || !account_expr || !amount_expr) {
      return
    }
    transactions.push({
      mdate: date_expr.mdate,
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
