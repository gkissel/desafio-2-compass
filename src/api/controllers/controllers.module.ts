import express from 'express'
import { HelloController } from './hello/hello.controller'

export const controllersRouter = express.Router()

controllersRouter.use(HelloController)
