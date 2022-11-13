import { reactive, computed } from "vue"

import 'src/text_parser/parser.js'
import { actions, types } from 'src/text_parser/functions.js'
const parse = (string) => text_parser.parse(string, { actions, types })
//import parse from 'src/text_parser/parser.js'

const settings = reactive({
  text: "- 2022.11.10 > 100k rub "
})
settings.parse_tree = computed(() => {
  const p = parse(settings.text)
  console.log('p', p)
  return p
})

export function useSettings() {
  return {settings}
}
