import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'
import routes from './api/routes/router'
import { AppDataSource } from './database/data-source'
import { env } from './env'
import AppError from './api/errors/AppError'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()

    app.use(express.json())

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

    app.use('/api/v1', routes)

    app.use(
      (error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.code).json({
            code: error.code,
            status: 'Bad Request',
            message: error.message,
          });
        }
    
        return response.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.',
        });
      },
    );

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`)
    })
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((error: any) => console.log(error))
