import express from 'express'
import { HelloController } from './hello.controller'

export const HelloModule = express.Router()

HelloModule.use('/hello', HelloController)
