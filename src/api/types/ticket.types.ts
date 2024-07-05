import { z } from 'zod';
import { createTicketSchema, ticketSchema } from '../schemas/ticket.schemas';

type ticketData = z.infer<typeof ticketSchema>;
type createTicketData = z.infer<typeof createTicketSchema>;

export { };
