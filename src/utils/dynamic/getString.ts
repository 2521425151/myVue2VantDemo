export const getQueryString = (name: string): any => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
export const firstUpperCase = (name: string): any => {
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : ''
}
export const dateFormat = (date: Date, format: string): any => {
  let y = ''
  let m = ''
  let yW: any = ''
  let mW: any = ''
  if (format.includes('YYYY')) {
    y = `${date.getFullYear()}`
    yW = format.match(/Y\W/g) || ''
    yW = yW ? yW[0][1] : ''
  }
  if (format.includes('MM')) {
    m = `${date.getMonth() + 1}`.padStart(2, '0')
    mW = format.match(/M\W/g) || ''
    mW = mW ? mW[0][1] : ''
  }
  const d = format.includes('DD') ? `${date.getDate()}`.padStart(2, '0') : ''
  return `${y}${yW}${m}${mW}${d}`
}
