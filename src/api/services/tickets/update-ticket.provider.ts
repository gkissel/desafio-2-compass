import AppError from '@/api/errors/AppError'
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
    throw new AppError('Bad Request', 'Ticket does not exist');
  }

  const session = await SessionRepository.findOne({
    where: { id: session_id },
  })

  if (!session) {
    throw new AppError('Bad Request', 'Session does not exist');
  }

  if (session.id !== ticket.session_id) {
    throw new AppError('Bad Request', 'SessionID does not match');
  }

  const checkTicket = await TicketRepository.findByChairAndSession(
    chair,
    session_id,
  )

  if (checkTicket && checkTicket.id !== id) {
    throw new AppError('Bad Request', 'This chair is already reserved.');
  }

  ticket.chair = chair
  ticket.value = value

  const updatedTicket = await TicketRepository.save(ticket)

  return ticketSchema.parse(updatedTicket)
}
