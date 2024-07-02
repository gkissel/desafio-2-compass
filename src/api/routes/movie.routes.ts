import { Router } from 'express'
import MovieController from '../controllers/movie.controller'

const router = Router({
  mergeParams: true,
})
const movieController = new MovieController()

router.get('/', movieController.listMovies)
router.get('/:id', movieController.searchMovie)
router.post('/', movieController.createMovie)
router.put('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)

// router.use('/:movie_id/sessions', sessionRoutes)

export default router
