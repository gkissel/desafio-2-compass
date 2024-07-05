import { AppDataSource } from '@/database/data-source'
import { Ticket } from '../entity/ticket.entity'

export const TicketRepository = AppDataSource.getRepository(Ticket).extend({})
