import { z } from 'zod'
import {
  createMovieSchema,
  listMovieSchema,
  moviePaginationSchema,
  movieSchema,
  newMovieSchema,
  searchMovieSchema,
  updateMovieSchema,
} from '../schemas/movie.schemas'

type movieData = z.infer<typeof movieSchema>
type createMovieData = z.infer<typeof createMovieSchema>
type newMovieData = z.infer<typeof newMovieSchema>
type updateMovieData = z.infer<typeof updateMovieSchema>
type listMovieData = z.infer<typeof listMovieSchema>
type listPaginationData = z.infer<typeof moviePaginationSchema>
type searchMovieData = z.infer<typeof searchMovieSchema>

export {
  createMovieData,
  newMovieData,
  movieData,
  updateMovieData,
  listMovieData,
  listPaginationData,
  searchMovieData,
}
