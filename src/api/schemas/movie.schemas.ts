import { z } from 'zod'

const movieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.date().transform((date) => {
    return date.toLocaleDateString('pt-BR')
  }),
  // sessions: z.array(
  //   z.object({
  //     id: z.number(),
  //     movie_id: z.number(),
  //     room: z.string(),
  //     capacity: z.number(),
  //     day: z.string(),
  //     time: z.string(),
  //     tickets: z.array(
  //       z.object({
  //         id: z.number(),
  //         session_id: z.number(),
  //         chair: z.string(),
  //         value: z.number(),
  //       }),
  //     ),
  //   }),
  // ),
})

const newMovieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.coerce.date().transform((date) => {
    return date.toLocaleDateString('pt-BR')
  }),
})

const createMovieSchema = newMovieSchema.omit({ id: true })
const updateMovieSchema = newMovieSchema
const listMovieSchema = z.array(movieSchema)
const moviePaginationSchema = z.object({
  perPage: z.coerce.number().default(20),
  page: z.coerce.number().default(1),
})
const searchMovieSchema = z.object({
  id: z.coerce.number(),
})

export {
  createMovieSchema,
  listMovieSchema,
  moviePaginationSchema,
  movieSchema,
  newMovieSchema,
  searchMovieSchema,
  updateMovieSchema,
}
