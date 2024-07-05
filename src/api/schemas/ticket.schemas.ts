import { z } from 'zod';

const ticketSchema = z.object({
  id: z.number(),
  session_id: z.number(),
  chair: z.string(),
  value: z.number(),
});

const createTicketSchema = ticketSchema.omit({ id: true });

export { ticketSchema, createTicketSchema };
