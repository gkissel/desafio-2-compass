import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { listMovieSchema } from '@/api/schemas/movie.schemas'
import { listMovieData, listPaginationData } from '@/api/types/movie.types'

export const ListMovie = async ({
  page,
  perPage,
}: listPaginationData): Promise<listMovieData> => {
  // eslint-disable-next-line camelcase
  const movies = await MovieRepository.find({
    take: perPage,
    skip: (page - 1) * perPage,
  })
  if (!movies) {
    throw new ResourceNotFoundError()
  }

  return listMovieSchema.parse(movies)
}
