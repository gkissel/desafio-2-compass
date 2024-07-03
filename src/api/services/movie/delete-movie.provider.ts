import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import z from 'zod'

export const deleteMovieRequestSchema = z.object({
  id: z.coerce.number(),
})

type deleteMovieRequestData = z.infer<typeof deleteMovieRequestSchema>

export const DeleteMovie = async ({ id }: deleteMovieRequestData) => {
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
