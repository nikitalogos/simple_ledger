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

const constrain = (value, min, max) => Math.min(Math.max(value, min), max)

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
//      prefix: statement?.elements[0]?.prefix?.text,
      date_expr: statement?.elements[1]?.date_expr,
      account_expr: statement?.elements[2]?.account_expr,
      amount_expr: statement?.elements[3]?.amount_expr,
      ...statement?.elements[4], // unpack title
    }
    return statement_out
  },

  make_account_expr(input, start, end, elements) {
    const default_acc = "card_rub"

    const acc_from = elements[0].text
    const acc_to = elements[1].text
    return {
      acc_from: acc_from !== "" ? acc_from : default_acc,
      acc_to: acc_to !== "" ? acc_to : default_acc,
    }
  },

  make_date_expr(input, start, end, elements) {
    const today = new Date()
    const default_year = today.getFullYear()
    const default_month = today.getMonth()
    const year_min = 1900 // todo move to config variables
    const year_max = 2100

    let error = ""

    let segments = [
      elements[0].text,
      elements[1]?.date_segment?.text,
      elements[2]?.date_segment?.text,
    ]
    segments = segments.map((el) => el === undefined ? el : parseInt(el))

    let year, month, day
    if (segments[2] === undefined) {
      if (segments[1] === undefined) {
        year = default_year
        month = default_month
        day = segments[0]
      } else {
        year = default_year
        month = segments[0]
        day = segments[1]
      }
    } else {
      year = segments[0]
      month = segments[1]
      day = segments[2]
    }

    const year_c = constrain(year, year_min, year_max)
    const month_c = constrain(month, 1, 12)
    const day_c = constrain(day, 1, 30)

    if (year !== year_c) {
      error += `Invalid year: should be in range ${year_min}-${year_max}, but is ${year}\n`
    }
    if (month !== month_c) {
      error += `Invalid month: should be in range ${1}-${12}, but is ${month}\n`
    }
    if (day !== day_c) {
      error += `Invalid day: should be in range ${0}-${30}, but is ${day}\n`
    }

    return {
      date: new Date(year=year_c, month=month_c-1, day=day_c),
      error,
    }
  },

  make_amount_expr(input, start, end, elements) {
    const default_currency = "rub"

    const multiplier_str = elements[1].text
    const multiplier = {
      "": 1,
      "k": 1000,
      "m": 1000*1000,
    }[multiplier_str]

    const amount_str = elements[0].text
    const amount = parseFloat(amount_str) * multiplier

    const currency = elements[2].text

    return {
      amount: amount,
      currency: currency !== "" ? currency : default_currency,
    }
  },

  make_title(input, start, end, elements) {
    const text = input.substring(start, end)
    const segments = make_list_factory('title_segment')(input, start, end, elements)

    const meta = segments.filter(seg => seg?.is_meta).map(seg => parse_meta(seg))

    const title = {text, meta} // segments
    title.is_pure_meta = (meta.length == segments.length)

    console.log('title', title)
    return title
  },
}


