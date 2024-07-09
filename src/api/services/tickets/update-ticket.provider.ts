import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { TicketSessionError } from '@/api/errors/ticket-session-error'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { TicketRepository } from '@/api/repositories/TicketRepository'
import { ticketSchema, updatedTicketSchema } from '@/api/schemas/ticket.schemas'
import { ticketData, updateTicketData } from '@/api/types/ticket.types'

export const UpdateTicket = async (
  ticketData: updateTicketData,
): Promise<ticketData> => {
  const { id, session_id, chair, value } = updatedTicketSchema.parse(ticketData)

  const ticket = await TicketRepository.findOne({ where: { id } })

  if (!ticket) {
    throw new ResourceNotFoundError()
  }

  const session = await SessionRepository.findOne({
    where: { id: session_id },
  })

  if (!session) {
    throw new ResourceNotFoundError()
  }

  if (session.id !== ticket.session_id) {
    throw new TicketSessionError()
  }

  const checkTicket = await TicketRepository.findByChairAndSession(
    chair,
    session_id,
  )

  if (checkTicket && checkTicket.id !== id) {
    throw new Error('This chair is already reserved.')
  }

  ticket.chair = chair
  ticket.value = value

  const updatedTicket = await TicketRepository.save(ticket)

  return ticketSchema.parse(updatedTicket)
}
