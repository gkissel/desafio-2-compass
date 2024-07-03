import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import z from 'zod'

export const listMovieRequestSchema = z.object({
  perPage: z.coerce.number().default(20),
  page: z.coerce.number().default(1),
})

export const listMovieResponseSchema = z.array(
  z.object({
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
  }),
)

type ListMovieRequestData = z.infer<typeof listMovieRequestSchema>

type ListMovieResponseData = z.infer<typeof listMovieResponseSchema>

export const ListMovie = async ({
  page,
  perPage,
}: ListMovieRequestData): Promise<ListMovieResponseData> => {
  // eslint-disable-next-line camelcase
  const movies = await MovieRepository.find({
    take: perPage,
    skip: (page - 1) * perPage,
  })
  if (!movies) {
    throw new ResourceNotFoundError()
  }

  return listMovieResponseSchema.parse(movies)
}
