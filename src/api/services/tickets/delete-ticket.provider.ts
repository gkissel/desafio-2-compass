import AppError from '@/api/errors/AppError'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { TicketRepository } from '@/api/repositories/TicketRepository'

export const DeleteTicket = async (
  id: number,
  session_id: number,
): Promise<void> => {
  const ticket = await TicketRepository.findOne({ where: { id } })

  if (!ticket) {
    throw new AppError('Bad Request', 'Ticket does not exist');
  }

  const session = await SessionRepository.findOne({ where: { id: session_id } })

  if (!session) {
    throw new AppError('Bad Request', 'Session does not exist');
  }

  if (session.id !== ticket.session_id) {
    throw new AppError('Bad Request', 'SessionID does not match');
  }

  await TicketRepository.remove(ticket)
}
