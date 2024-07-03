import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { movieData, updateMovieData } from '@/api/interfaces/movie.interfaces'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { movieSchema, updateMovieSchema } from '@/api/schemas/movie.schemas'

export const UpdateMovie = async (
  movieData: updateMovieData,
): Promise<movieData> => {
  // eslint-disable-next-line camelcase
  const { actors, description, genre, image, name, release_date, id } =
    updateMovieSchema.parse(movieData)

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

  return movieSchema.parse(updatedMovie)
}
