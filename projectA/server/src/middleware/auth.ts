import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import commonRes from '../utils/commonRes'
export default (req: Request, res: Response, next: NextFunction) => {
  const passUrls = ['/login/password', '/register', '/uploads']
  const { url } = req
  if (passUrls.some((item) => url.includes(item))) {
    next()
    return
  }
  const token = String(req.headers.authorization)
  if (token === 'undefined') {
    commonRes(res, null, { message: '未登录', code: 50 })
    return
  }
  const id = jwt.decode(token)
  // @ts-ignore
  req.userId = id
  next()
}
