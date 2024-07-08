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
    throw new ResourceNotFoundError()
  }

  await MovieRepository.softRemove(movie)
}
