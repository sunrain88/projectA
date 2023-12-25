// src/routes/index.ts
import path from 'path'
import express, { Express, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import commonRes from '../utils/commonRes'
import { getSQLData } from '../model/dbConnect'
import { AccountTblData } from '../type'
import { upload, commonPath as CommonPath } from '../utils/upload'

let commonPath = CommonPath
// 路由配置接口
interface RouterConf {
  path: string
  router: Router
  meta: any
}

// 路由配置
const routerConf: Array<RouterConf> = []

function routes(app: Express) {
  // 根目录
  // routes/index.ts 有删减

  app.get('/', async (req: Request, res: Response) => {
    // commonRes(res, { word: 'Hello Shinp!!!' }, { type: 'success', message: '请求成功' }) 成功
    // commonRes.denied(res, null) 无权限
    // commonRes.error(res, null) 错误
    commonRes(res, { data: 'Hello Shinp!!!' }) // 成功
  })

  // 注册`
  app.post('/register', async (req: Request, res: Response) => {
    const { password_hash, phone_number, nick } = req.body
    // 参数错误
    if (!password_hash || !phone_number || !nick) {
      commonRes(res, null, { message: '参数错误', type: 'ERROR', status: 200 })
      return
    }
    const sqlStr = `SELECT * FROM tbl_user WHERE phone_number = ${phone_number} LIMIT 1`
    const result = (await getSQLData(sqlStr)) as Array<AccountTblData>
    // 账号已存在
    if (result.length) {
      commonRes(res, null, { message: '该手机号已被注册', code: 460 })
      return
    }

    const sqlStr2 = `INSERT INTO tbl_user (nick,phone_number,password_hash) VALUES ('${nick}','${phone_number}','${password_hash}')`
    const registerData = await getSQLData(sqlStr2)
    if (registerData) {
      commonRes(res, null, { message: '注册成功', code: 200 })
      return
    } else {
      commonRes(res, null, { message: '注册失败', code: 470 })
      return
    }
  })

  // 登录
  app.post('/login/password', async (req: Request, res: Response) => {
    const { password_hash, phone_number } = req.body
    const result = (await getSQLData(
      `SELECT * FROM tbl_user WHERE phone_number=${phone_number} LIMIT 1`
    )) as Array<AccountTblData>
    const exist = result.length
    if (!exist) {
      commonRes(res, null, { message: '账号不存在', code: 480 })
      return
    }
    const userInfo = result[0]
    if (userInfo.password_hash !== password_hash) {
      commonRes(res, null, { message: '密码错误', code: 490 })
      return
    }
    const { id } = userInfo
    const token = jwt.sign(id.toString(), 'test-token')
    res.header('authorization', token)
    commonRes(res, Object.assign(userInfo, { token }), {
      message: '登录成功',
      code: 200,
    })
  })

  // 退出登录
  app.post('/login/logout', async (req: Request, res: Response) => {})

  // 获取个人信息
  app.get('/user/get_user_info', async (req: Request, res: Response) => {
    // @ts-ignore
    const userId: number | string | undefined = req.userId
    if (userId) {
      const data = (await getSQLData(
        `SELECT * FROM tbl_user WHERE id=${userId}`
      )) as Array<AccountTblData>
      if (data.length === 1) {
        commonRes(res, data[0], { message: 'success', code: 200 })
        return
      } else {
        commonRes(res, data.length, { message: '账号数据异常', code: 52 })
        return
      }
    }
    commonRes(res, null, { message: '未登录', code: 51 })
  })

  // 上传图片
  app.post(
    '/upload/image',
    upload.single('file'),
    (req: Request, res: Response) => {
      const file = req.file

      console.log(req.body, req.userId)
      if (!file) {
        commonRes(res, null, { message: 'Please upload a file.', code: 551 })
        return
      }
      // 返回文件信息
      const { filename, originalname, destination, mimetype, size } = file
      // TODO 后续添加文件名文件路径名的特殊字符容错处理
      const fileDirPath = destination.split('\\').join('/')
      commonRes(
        res,
        {
          filename,
          originalname,
          mimetype,
          size,
          path: `http://localhost:1337/${fileDirPath}/${filename}`,
        },
        { message: '图片上传成功', code: 200 }
      )
    }
  )

  // 获取图片
  app.get('/file/get_image', async (req: Request, res: Response) => {
    commonRes(res, { data: 'get-image', message: '', code: 200 })
  })

  app.post('/quick/sql', async (req: Request, res: Response) => {
    const { sqlStr } = req.body
    try {
      const result = await getSQLData(sqlStr)
      commonRes(res, result, { message: '查询成功', code: 200 })
    } catch (err: any) {
      console.log(err)
      commonRes(res, null, {
        message: '查询失败' + err.sqlMessage,
        code: 550,
      })
    }
  })

  app.use('/uploads', express.static(path.resolve('../uploads')))

  routerConf.forEach((conf) => app.use(conf.path, conf.router))
}

export default routes
