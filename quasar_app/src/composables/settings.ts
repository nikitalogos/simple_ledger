import { reactive, computed } from "vue"

import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })
//import parse from 'src/text_parser/parser.js'

const settings = reactive({
//  text: "- 2022.11.10 > 100k rub ",
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
settings.parse_tree = computed(() => {
  const p = parse(settings.text)
  console.log('p', p)
  return p
})

export function useSettings() {
  return {settings}
}
