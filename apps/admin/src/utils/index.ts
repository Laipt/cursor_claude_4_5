export function pathResolve(...args: string[]) {
  return args.join('/').replace(/\/+/g, '/')
}

export function isLocation(value: string) {
  const [longitude, latitude] = value.split(',')
  const longReg = /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d){1}\.\d{1,6})|(\d|[1-9]\d|1[0-7]\d){1})$/
  const latReg = /^(-|\+)?([0-8]?\d{1}\.\d{1,6}|90(\.0{1,6})?)$/
  return longReg.test(longitude) && latReg.test(latitude)
}

export function getDictOptions(map) {
  return Object.entries(map).map(([k, v]) => ({ label: v, value: /^\d+$/.test(k) ? Number(k) : k }))
}

export function getCloudImgUrl(value?: string) {
  if (!value) return value
  if (value.startsWith('cloud://')) {
    const env = value.match(/\/\/((\w|-)+)\./)?.[1]
    const reg = new RegExp(`cloud:\\/\\/${env}\\.([^\\/]*)(\\/\\w+\\/.*)`)
    return value.replace(reg, 'https://$1.tcb.qcloud.la$2')
  }
  return value
}
