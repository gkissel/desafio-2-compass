import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import z from 'zod'

export const updateMovieRequestSchema = z.object({
  image: z.string(),
  id: z.number(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.string(),
})

const updateMovieResponseSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.string(),
})

type updateMovieRequestData = z.infer<typeof updateMovieRequestSchema>

type updateMovieResponseData = z.infer<typeof updateMovieRequestSchema>

export const UpdateMovie = async (
  movieData: updateMovieRequestData,
): Promise<updateMovieResponseData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date, id } =
    updateMovieRequestSchema.parse(movieData)

  const movie = await MovieRepository.findOne({
    where: { id },
    // relations: { sessions: true },
  })

  if (!movie) {
    throw new ResourceNotFoundError()
  }

  movie.actors = actors
  movie.description = description
  movie.genre = genre
  // eslint-disable-next-line camelcase
  movie.release_date = new Date(release_date).toISOString();
  movie.image = image
  movie.name = name

  const updatedMovie = await MovieRepository.save(movie)

  return updateMovieResponseSchema.parse(updatedMovie)
}
