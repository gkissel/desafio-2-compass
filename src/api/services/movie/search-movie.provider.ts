import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { movieSchema } from '@/api/schemas/movie.schemas'
import { movieData, searchMovieData } from '@/api/types/movie.types'

export const SearchMovie = async ({
  id,
}: searchMovieData): Promise<movieData> => {
  // eslint-disable-next-line camelcase
  const movies = await MovieRepository.findOne({
    where: { id },
  })
  if (!movies) {
    throw new ResourceNotFoundError()
  }

  return movieSchema.parse(movies)
}
