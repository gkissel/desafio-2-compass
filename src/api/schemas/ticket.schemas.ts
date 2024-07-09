import { z } from 'zod'

const ticketSchema = z.object({
  id: z.number(),
  session_id: z.number(),
  chair: z.string(),
  value: z.number(),
})

const createTicketSchema = ticketSchema.omit({ id: true })
const updatedTicketSchema = ticketSchema

export { ticketSchema, createTicketSchema, updatedTicketSchema }
