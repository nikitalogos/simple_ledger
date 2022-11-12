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
  CompactLocation: {
    compact_location() {
      return this.elements[1].text
    }
  },
  CompactActionName: {
    compact_action_name() {
      return this.elements[1].text
    }
  },
  NonameLabel: {label_type() {return 'noname'}},
  NamedLabel: {label_type() {return 'named'}},
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
  if (node?.compact_location) {
    return {
      type: 'key_value',
      key: "location",
      value: node.compact_location(),
    }
  }
  if (node?.compact_action_name) {
    return {
      type: 'key_value',
      key: "name",
      value: node.compact_action_name(),
    }
  }
  throw "Failed to parse meta!"
}

export const actions = {
  make_statements: make_list_factory('statement'),

//  make_action (input, start, end, elements) {
//    let action = {
//      title: elements[0],
//      children: elements[1].elements.map(el => el.line)
//    }
//    console.log('elements', input.substring(start,end), elements)
//    return action
//  },

  make_statement (input, start, end, elements) {
    let statement = elements[0]

    console.log('statement', statement)

    const statement_out = {
      label: {
        type: statement?.elements[0]?.label?.label_type(),
        value: statement?.elements[0]?.label?.text,
      },
      time_expr: statement?.elements[1]?.time_expr?.text,
      reminders: statement?.elements[2].elements.map(el => el.reminder.text),
      state: statement?.elements[3]?.state?.state_value.text,
      ...statement.title,
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


