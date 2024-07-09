import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import { TicketRepository } from '@/api/repositories/TicketRepository'
import { createTicketSchema, ticketSchema } from '@/api/schemas/ticket.schemas'
import { createTicketData, ticketData } from '@/api/types/ticket.types'

export const CreateTicket = async (
  ticketData: createTicketData,
): Promise<ticketData> => {
  // eslint-disable-next-line camelcase
  const { session_id, chair, value } = createTicketSchema.parse(ticketData)

  if (await TicketRepository.exists({ where: { chair, session_id } })) {
    throw new Error('This chair is already reserved.')
  }

  const session = await SessionRepository.findOne({
    where: { id: session_id },
  })

  if (!session) {
    throw new ResourceNotFoundError()
  }

  const checkCapacity = await TicketRepository.find({
    where: { session_id },
  })

  if (checkCapacity.length >= session.capacity) {
    throw new Error('This session is full.')
  }

  const ticket = TicketRepository.create({
    chair,
    value,
    session,
  })

  await TicketRepository.save(ticket)

  return ticketSchema.parse(ticket)
}
