import AppError from '@/api/errors/AppError'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { createMovieSchema, newMovieSchema } from '@/api/schemas/movie.schemas'
import { createMovieData, newMovieData } from '@/api/types/movie.types'

export const CreateMovie = async (
  movieData: createMovieData,
): Promise<newMovieData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date } =
    createMovieSchema.parse(movieData)

  if (await MovieRepository.exists({ where: { name } })) {
    throw new AppError('Bad Request', 'Movie name already registered');
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
