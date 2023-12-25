import express, { Express } from 'express'
import cors from 'cors'
import responseHeader from './responseHeader'
import httpLog from './log'
import auth from './auth'

function initMiddleware(app: Express) {
  app.use(cors())
  app.use(auth)
  app.use(express.json())
  app.use(httpLog)
  app.use(responseHeader)
}

export default initMiddleware
