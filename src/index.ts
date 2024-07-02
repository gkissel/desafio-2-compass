import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'
import routes from './api/routes/router'
import { AppDataSource } from './database/data-source'
import { env } from './env'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()

    app.use(express.json())

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

    app.use('/api/v1', routes)

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`)
    })
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((error: any) => console.log(error))
