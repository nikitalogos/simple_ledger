function make_list_factory(label) {
  return (input, start, end, elements) => {
    console.log('statements', elements)

    let list = []
    if (elements?.[0]) {
      list.push(elements[0])
    }
    if (elements?.[1]) {
      elements[1].forEach((el) => list.push(el[label]))
    }
    return list
  }
}

export const types = {
  Meta: {
    is_meta: true,
  },
}

function parse_meta(node){
  if (node?.key) {
    return {
      type: 'key_value',
      key: node.key.text,

      // universal parsing for both "quoted" and "not quoted" cases
      value: node.value.elements.map(el => el.text).join(''),
    }
  }
  if (node?.tag_name) {
    return {
      type: 'tag',
      name: node.tag_name.text,
    }
  }
  throw "Failed to parse meta!"
}

export const actions = {
  make_statements: make_list_factory('statement'),

  make_statement (input, start, end, elements) {
    let statement = elements[0]

    console.log('statement', statement)

    const statement_out = {
      prefix: statement?.elements[0]?.prefix?.text,
      date_expr: statement?.elements[1]?.date_expr?.text,
      account_expr: statement?.elements[2].account_expr?.text,
      amount_expr: statement?.elements[3]?.amount_expr?.text,
      ...statement?.elements[4], // unpack title
    }
    return statement_out
  },

  make_title(input, start, end, elements) {
    const text = input.substring(start, end)
    const segments = make_list_factory('title_segment')(input, start, end, elements)

    const meta = segments.filter(seg => seg?.is_meta).map(seg => parse_meta(seg))

    const title = {text, meta} // segments
    title.is_pure_meta = (meta.length == segments.length)

    console.log('title', title)
    return title
  }
}


