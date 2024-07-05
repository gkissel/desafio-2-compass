import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { SessionRepository } from '@/api/repositories/SessionRepository';
import { MovieRepository } from '@/api/repositories/MovieRepository';
import { movieSchema } from '@/api/schemas/movie.schemas';
import {
  createSessionSchema,
  newSessionSchema,
  sessionSchema,
} from '@/api/schemas/session.schemas';
import { createSessionData, newSessionData, sessionData } from '@/api/types/session.types';

export const CreateSession = async (
  sessionData: createSessionData,
): Promise<sessionData> => {
  // eslint-disable-next-line camelcase
  const { movie_id, room, capacity, day, time } =
    createSessionSchema.parse(sessionData);

  const movie = await MovieRepository.findOne({ where: { id: movie_id } });

  if (!movie) {
    throw new ResourceNotFoundError();
  }
  

  const isAvailable = await SessionRepository.isRoomAvailable(room, day, time);
  if (!isAvailable) {
    throw new Error('Room is already booked for another session at this time.');
  }

  const session = SessionRepository.create({
    room,
    capacity,
    day,
    time,
    movie: movieSchema.parse(movie),
  });

  await SessionRepository.save(session);

  const createdSession: sessionData = {
    ...newSessionSchema.parse(session),
    movie_id: movie.id,
  }
  
  return sessionSchema.parse(createdSession);
};
