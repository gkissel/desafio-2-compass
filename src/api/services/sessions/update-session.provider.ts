import AppError from '@/api/errors/AppError'
import { MovieRepository } from '@/api/repositories/MovieRepository'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import {
  sessionSchema,
  updateSessionSchema,
} from '@/api/schemas/session.schemas'
import { sessionData, updateSessionData } from '@/api/types/session.types'

export const UpdateSession = async (
  sessionData: updateSessionData,
): Promise<sessionData> => {
  const { id, movie_id, room, capacity, day, time } =
    updateSessionSchema.parse(sessionData)

  const movie = await MovieRepository.findOne({ where: { id: movie_id } })

  if (!movie) {
    throw new AppError('Bad Request', 'Customer not found.');
  }

  const session = await SessionRepository.findOne({ where: { id } })

  if (!session) {
    throw new AppError('Bad Request', 'Session does not exist');
  }

  if (movie.id !== session.movie_id) {
    throw new AppError('Bad Request', 'MovieID does not match.');
  }

  const checkSession = await SessionRepository.findByRoomAndDayAndTime(
    room,
    day,
    time,
  )

  if (checkSession && checkSession.id !== id) {
    throw new AppError('Bad Request', 'Room is already booked for another session at this time.');
  }

  session.room = room
  session.capacity = capacity
  session.day = day
  session.time = time

  const updatedSession = await SessionRepository.save(session)

  return sessionSchema.parse(updatedSession)
}
