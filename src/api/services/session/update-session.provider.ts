import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { SessionMovieError } from '@/api/errors/session-movie-error';
import { MovieRepository } from '@/api/repositories/MovieRepository';
import { SessionRepository } from '@/api/repositories/SessionRepository';
import {
  sessionSchema,
  updateSessionSchema,
} from '@/api/schemas/session.schemas';
import { sessionData, updateSessionData } from '@/api/types/session.types';

export const UpdateSession = async (
  sessionData: updateSessionData,
): Promise<sessionData> => {
  const { id, movie_id, room, capacity, day, time } =
    updateSessionSchema.parse(sessionData);

  const movie = await MovieRepository.findOne({ where: { id: movie_id } });

  if (!movie) {
    throw new ResourceNotFoundError();
  }

  const session = await SessionRepository.findOne({ where: { id } });

  if (!session) {
    throw new ResourceNotFoundError();
  }
  
  if (movie.id !== session.movie_id) {
    throw new SessionMovieError(); // melhorar esse erro - exibir msg
  }

  session.room = room;
  session.capacity = capacity;
  session.day = day;
  session.time = time;

  const updatedSession = await SessionRepository.save(session);

  return sessionSchema.parse(updatedSession);
};
