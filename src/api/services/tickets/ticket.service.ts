import { CreateTicket } from './create-ticket.provider'
import { UpdateTicket } from './update-ticket.provider'
import { DeleteTicket } from './delete-ticket.provider'

export default class TicketService {
  createTicket = CreateTicket

  updateTicket = UpdateTicket

  deleteTicket = DeleteTicket
}
