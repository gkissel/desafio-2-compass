import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { SessionMovieError } from '@/api/errors/session-movie-error'

export const DeleteSession = async (
  id: number,
  movie_id: number,
): Promise<void> => {
  const session = await SessionRepository.findOne({ where: { id } })

  if (!session) {
    throw new ResourceNotFoundError()
  }

  const movie = await MovieRepository.findOne({ where: { id: movie_id } })

  if (!movie) {
    throw new ResourceNotFoundError()
  }

  if (movie.id !== session.movie_id) {
    throw new SessionMovieError() // melhorar esse erro - exibir msg
  }

  await SessionRepository.remove(session)
}
