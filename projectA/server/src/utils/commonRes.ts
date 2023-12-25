// utils/commonRes.ts
// 按自己需要删改

import { Response } from 'express'
import logger from './logger'
import { Code, codeType, CodeMessage } from '../constants/code'

interface ResOption {
  type?: codeType
  status?: number
  code?: number
  message?: unknown
}

// 默认成功响应
function commonRes(res: Response, data: unknown, options?: ResOption) {
  options = Object.assign({ type: Code[200] }, options || {}) // 默认success

  const { type, code, status = 200, message } = options
  let resStatus = status

  if (resStatus === undefined) {
    // 根据状态设置状态码
    resStatus = type === Code[200] ? 200 : 409
  }

  // 响应参数
  const sendRes: { code: number; data: unknown; message?: unknown } = {
    code: code || Code[type as codeType],
    data,
  }
  // 响应描述
  message && (sendRes.message = message)

  return res.status(resStatus).send(sendRes)
}

// 错误响应
commonRes.error = function (
  res: Response,
  data: unknown,
  message?: unknown,
  status?: number
) {
  logger.error(message || CodeMessage['ERROR'])
  this(res, data, {
    type: 'ERROR',
    message: message || CodeMessage['ERROR'],
    status: status || 409,
  })
}

// 无权限响应
commonRes.denied = function (res: Response, data: unknown) {
  this(res, data, {
    type: 'DENIED',
    message: CodeMessage['DENIED'],
    status: 401,
  })
}

export default commonRes
