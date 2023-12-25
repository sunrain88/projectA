// src/app.ts

import express from 'express'
import routes from './routes' // 路由
import logger from './utils/logger'
import config from './config/default'
import initMiddleware from './middleware'
import { initDB } from './model'
import path from 'path'
const app = express()

initMiddleware(app)
initDB()

const PORT = config['port']
// 启动
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))
app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`)
  routes(app)
})
