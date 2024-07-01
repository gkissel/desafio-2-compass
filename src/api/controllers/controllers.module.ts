import express from 'express'
import { HelloModule } from './hello/hello.module'

export const controllersRouter = express.Router()

controllersRouter.use(HelloModule)
