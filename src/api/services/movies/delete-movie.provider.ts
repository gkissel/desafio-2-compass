import AppError from '@/api/errors/AppError'
import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { searchMovieData } from '@/api/types/movie.types'

export const DeleteMovie = async ({ id }: searchMovieData) => {
  // eslint-disable-next-line camelcase
  const movie = await MovieRepository.findOne({
    where: { id },
    // relations: { sessions: true },
  })
  if (!movie) {
    throw new AppError('Bad Request', 'Customer not found.', 500);
  }

  await MovieRepository.remove(movie)
}
