import { AppDataSource } from '@/database/data-source'
import { Ticket } from '../entity/ticket.entity'

export const TicketRepository = AppDataSource.getRepository(Ticket).extend({
    async findByChairAndSession(chair: string, session_id: number): Promise<Ticket | null> {
        const ticket = await this.findOne({ where: { chair, session_id } });
        return ticket;
      }
})
