import { MovieRepository } from '@/api/repositories/MovieRepository'
import z from 'zod'

export const createMovieRequestSchema = z.object({
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.string(),
})

const createMovieResponseSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.string(),
})

type createMovieRequestData = z.infer<typeof createMovieRequestSchema>

type createMovieResponseData = z.infer<typeof createMovieRequestSchema>

export const CreateMovie = async (
  movieData: createMovieRequestData,
): Promise<createMovieResponseData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date } =
    createMovieRequestSchema.parse(movieData)

  if (await MovieRepository.exists({ where: { name } })) {
    throw new Error('Movie name already registered')
  }
  const movie = MovieRepository.create({
    actors,
    description,
    genre,
    image,
    name,
    release_date,
  })

  await MovieRepository.save(movie)

  return createMovieResponseSchema.parse(movie)
}
