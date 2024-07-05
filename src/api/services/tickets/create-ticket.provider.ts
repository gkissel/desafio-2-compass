import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { SessionRepository } from '@/api/repositories/SessionRepository';
import { TicketRepository } from '@/api/repositories/TicketRepository';
import { sessionSchema } from '@/api/schemas/session.schemas';
import { createTicketSchema, ticketSchema } from '@/api/schemas/ticket.schemas';
import { createTicketData, ticketData } from '@/api/types/ticket.types';

export const CreateTicket = async (
  ticketData: createTicketData,
): Promise<ticketData> => {
  // eslint-disable-next-line camelcase
  const { session_id, chair, value } = createTicketSchema.parse(ticketData);

  const session = await SessionRepository.findOne({
    where: { id: session_id },
  });

  if (!session) {
    throw new ResourceNotFoundError();
  }

  const ticket = TicketRepository.create({
    chair,
    value,
    session: sessionSchema.parse(session),
  });

  await TicketRepository.save(ticket);

  return ticketSchema.parse(ticket);
};
