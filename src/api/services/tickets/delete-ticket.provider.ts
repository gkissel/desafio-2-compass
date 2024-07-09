import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { TicketSessionError } from '@/api/errors/ticket-session-error'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { TicketRepository } from '@/api/repositories/TicketRepository'

export const DeleteTicket = async (
  id: number,
  session_id: number,
): Promise<void> => {
  const ticket = await TicketRepository.findOne({ where: { id } })

  if (!ticket) {
    throw new ResourceNotFoundError()
  }

  const session = await SessionRepository.findOne({ where: { id: session_id } })

  if (!session) {
    throw new ResourceNotFoundError()
  }

  if (session.id !== ticket.session_id) {
    throw new TicketSessionError()
  }

  await TicketRepository.remove(ticket)
}
