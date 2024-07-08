import { z } from 'zod';
import { createTicketSchema, ticketSchema, updatedTicketSchema } from '../schemas/ticket.schemas';

type ticketData = z.infer<typeof ticketSchema>;
type createTicketData = z.infer<typeof createTicketSchema>;
type updateTicketData = z.infer<typeof updatedTicketSchema>

export { ticketData, createTicketData, updateTicketData };
