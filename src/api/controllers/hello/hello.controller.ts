import { HelloService } from '@/api/services/hello.service'
import express from 'express'

export const HelloController = express.Router()

HelloController.get(
  '/',
  async (req: express.Request, res: express.Response) => {
    const helloSerice = new HelloService()

    const message = await helloSerice.execute()

    res.send({ message })
  },
)
