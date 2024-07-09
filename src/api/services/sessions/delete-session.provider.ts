import { SessionRepository } from '@/api/repositories/SessionRepository'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import AppError from '@/api/errors/AppError'

export const DeleteSession = async (
  id: number,
  movie_id: number,
): Promise<void> => {
  const session = await SessionRepository.findOne({ where: { id } })

  if (!session) {
    throw new AppError('Bad Request', 'Session does not exist');
  }

  const movie = await MovieRepository.findOne({ where: { id: movie_id } })

  if (!movie) {
    throw new AppError('Bad Request', 'Customer not found.');
  }

  if (movie.id !== session.movie_id) {
    throw new AppError('Bad Request', 'MovieID does not match.');
  }

  await SessionRepository.remove(session)
}
