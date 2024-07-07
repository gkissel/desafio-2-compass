import { AppDataSource } from '@/database/data-source';
import { Session } from '../entity/session.entity';

export const SessionRepository = AppDataSource.getRepository(Session).extend({
  async findByRoomAndDayAndTime(
    room: string,
    day: string,
    time: string,
  ): Promise<Session | null> {
    return this.findOne({ where: { room, day, time } });
  },

  async findByMovie(movie_id: number): Promise<Session[] | null> {
    return this.find({ where: { movie_id } });
  },
});
