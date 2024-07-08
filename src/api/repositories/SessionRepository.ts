import { AppDataSource } from '@/database/data-source';
import { Session } from '../entity/session.entity';

export const SessionRepository = AppDataSource.getRepository(Session).extend({
  async isRoomAvailable(room: string, day: string, time: string): Promise<boolean> {
    const sessions = await this.findSessionsByRoomAndDayAndTime(room, day, time);
    return sessions.length === 0;
  },

  async findSessionsByRoomAndDayAndTime(room: string, day: string, time: string): Promise<Session[]> {
    return this.createQueryBuilder('session')
      .where('session.room = :room', { room })
      .andWhere('session.day = :day', { day })
      .andWhere('session.time = :time', { time })
      .getMany();
  }
});
