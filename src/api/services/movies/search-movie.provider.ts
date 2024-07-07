import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { MovieRepository } from '@/api/repositories/MovieRepository';
import { SessionRepository } from '@/api/repositories/SessionRepository';
import { TicketRepository } from '@/api/repositories/TicketRepository';
import { movieSchema } from '@/api/schemas/movie.schemas';
import { movieData, searchMovieData } from '@/api/types/movie.types';

export const SearchMovie = async ({
  id,
}: searchMovieData): Promise<movieData> => {
  // eslint-disable-next-line camelcase
  const movie = await MovieRepository.findOne({
    where: { id },
  });
  if (!movie) {
    throw new ResourceNotFoundError();
  }

  const sessions = await SessionRepository.find({ where: { movie_id: id } }); // encontrar as sessions do filme

  for (let i = 0; i < sessions.length; i++) {
    const tickets = await TicketRepository.find({ where: { session_id: sessions[i].id}})
    sessions[i].tickets = tickets
  }

  movie.sessions = sessions
  
  return movieSchema.parse(movie);
};
