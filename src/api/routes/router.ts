import { Router } from 'express'
import movieRoutes from './movie.routes'

const routes = Router({
  mergeParams: true,
})

routes.use('/movies', movieRoutes)

export default routes
