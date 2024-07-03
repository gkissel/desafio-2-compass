import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import z from 'zod'

export const searchMovieRequestSchema = z.object({
  id: z.coerce.number(),
})

export const searchMovieResponseSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.date(),
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

type searchMovieRequestData = z.infer<typeof searchMovieRequestSchema>

type searchMovieResponseData = z.infer<typeof searchMovieResponseSchema>

export const SearchMovie = async ({
  id,
}: searchMovieRequestData): Promise<searchMovieResponseData> => {
  // eslint-disable-next-line camelcase
  const movies = await MovieRepository.findOne({
    where: { id },
  })
  if (!movies) {
    throw new ResourceNotFoundError()
  }

  return searchMovieResponseSchema.parse(movies)
}
