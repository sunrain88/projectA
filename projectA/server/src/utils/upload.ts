import express, { Request, Response } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import commonRes from './commonRes'
// 上传文件的中间件
// 公共路径
export let commonPath = 'uploads/image'
export const upload = multer({
  // dest: 'uploads/',
  limits: {
    fileSize: 1024 * 1024 * 20, // 限制文件大小为10M
  },
  fileFilter: (req, file, cb) => {
    // 限制文件类型
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ]
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type.'))
      return
    }
    cb(null, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(commonPath)) {
        fs.mkdirSync(commonPath)
      }
      const imageType = file.mimetype.split('/').pop()
      if (imageType === undefined) {
        throw Error('图片类型错误')
        return
      }
      const filePath = path.join(commonPath, imageType)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
      }
      // // 拼接路径
      cb(null, filePath)
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
})
