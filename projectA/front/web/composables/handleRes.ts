import { message as AMessage } from 'ant-design-vue'

interface responseDataType {
  code: number
  message: string
  data: any
}
interface handleResOptionsType {
  callback: Function
}
export function handleRes(res: any, options?: handleResOptionsType): responseDataType {
  console.log(res.code)
  if (options) { options.callback(res) }
  else {
    const { code, message } = res
    if (code !== 200)
      AMessage.error(message)
  }

  return res
}
