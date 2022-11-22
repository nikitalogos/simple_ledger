export function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}

export function isLeapYear(year) {
  return daysInYear(year) === 366
}

//export function daysInMonth(year, month) {
//  return {
//    0: 31,
//    1: isLeapYear(year) ? 29 : 28,
//    2: 31,
//    3: 30,
//    4: 31,
//    5: 30,
//    6: 31,
//    7: 31,
//    8: 30,
//    9: 31,
//    10: 30,
//    11: 31
//  }[month]
//}
