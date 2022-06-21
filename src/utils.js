
/**
 * 传入指定格式，生成固定格式的时间
 * @returns {String}
 * @param mode
 * @param s 秒数
 */
export function getTimerStr (s, mode) {
  const formatObj = {
    h: Math.floor(s / 3600),
    i: mode.includes('{h}') ? Math.floor(s % 3600 / 60) : Math.floor(s / 60),
    s: mode.includes('{h}') ? Math.floor(s % 3600 % 60) : mode.includes('{i}') ? Math.floor(s % 60) : s
  }
  return mode.replace(/{([his])+}/g, (result, key) => {
    return formatObj[key].toString().padStart(2, '0')
  })
}

/**
 * @param { String } cFormat {y}-{m}-{d} {h}:{i}:{s}  {a}获取星期几
 * @param { Date } date
 * @returns { String } 时间格式化字符串
 *  时间格式化
 */
export function format (date, cFormat) {
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  let format
  // 完整时间 {y}-{m}-{d} {h}:{i}:{s}  {a}获取星期几
  if (cFormat && cFormat !== 'time') {
    format = cFormat
  } else if (cFormat === 'time') {
    format = '{y}-{m}-{d} {h}:{i}'
  } else {
    format = '{y}-{m}-{d}'
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

/**
 * @param { Date } d
 * @param { Number } num
 * @param { String } unit 'y|M|d|h|m|s'
 * @returns { Object } 时间对象
 * 获取指定时间之前的年月日时分秒
 */
export function subtract(d, num, unit) {
  let date
  switch (unit) {
    case 'y':
      date = new Date(d.setFullYear(d.getFullYear() - num))
      break
    case 'M':
      date = new Date(d.setMonth(d.getMonth() - num))
      break
    case 's':
      date = new Date(d.setSeconds(d.getSeconds() - num))
      break
    case 'h':
      date = new Date(d.setHours(d.getHours() - num))
      break
    case 'm':
      date = new Date(d.setMinutes(d.getMinutes() - num))
      break
    default:
      date = new Date(d.setDate(d.getDate() - num))
  }
  return date
}
