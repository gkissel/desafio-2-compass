import { createMovieData, newMovieData } from '@/api/interfaces/movie.interfaces'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { createMovieSchema, newMovieSchema } from '@/api/schemas/movie.schemas'

export const CreateMovie = async (
  movieData: createMovieData,
): Promise<newMovieData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date } =
    createMovieSchema.parse(movieData)

  if (await MovieRepository.exists({ where: { name } })) {
    throw new Error('Movie name already registered')
  }
  const movie = MovieRepository.create({
    actors,
    description,
    genre,
    image,
    name,
    release_date: new Date(release_date).toISOString(),
  })

  await MovieRepository.save(movie)

  return newMovieSchema.parse(movie)
}
