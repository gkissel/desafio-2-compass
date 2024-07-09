import AppError from '@/api/errors/AppError'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { newMovieSchema, updateMovieSchema } from '@/api/schemas/movie.schemas'
import { newMovieData, updateMovieData } from '@/api/types/movie.types'

export const UpdateMovie = async (
  movieData: updateMovieData,
): Promise<newMovieData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date, id } =
    updateMovieSchema.parse(movieData)

  const movie = await MovieRepository.findOne({
    where: { id },
    // relations: { sessions: true },
  })

  if (!movie) {
    throw new AppError('Bad Request', 'Film does not exist');
  }

  const checkMovie = await MovieRepository.findByName(name)

  if (checkMovie && checkMovie.id !== id) {
    throw new AppError('Bad Request', 'Movie name already registered');
  }

  movie.actors = actors
  movie.description = description
  movie.genre = genre
  // eslint-disable-next-line camelcase
  movie.release_date = new Date(release_date)
  movie.image = image
  movie.name = name

  const updatedMovie = await MovieRepository.save(movie)

  return newMovieSchema.parse(updatedMovie)
}
