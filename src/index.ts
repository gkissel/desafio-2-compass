import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { controllersRouter } from './api/controllers/controllers.module'
import { AppDataSource } from './database/data-source'
import { env } from './env'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()

    app.use(express.json())

    const swaggerDocument = {
      openapi: '3.0.0',
      info: {
        title: 'Projeto Compass',
        description: 'Desafio',
        version: '1.0.0',
      },
    }

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    app.use('/api/v1', controllersRouter)

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`)
    })
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((error: any) => console.log(error))
