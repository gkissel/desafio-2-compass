import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { TicketRepository } from '@/api/repositories/TicketRepository'
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

  for (const movie of movies) {
    const sessions = await SessionRepository.find({
      where: { movie_id: movie.id },
    })
    for (const session of sessions) {
      const tickets = await TicketRepository.find({
        where: { session_id: session.id },
      })
      session.tickets = tickets
    }
    movie.sessions = sessions
  }

  return listMovieSchema.parse(movies)
}
