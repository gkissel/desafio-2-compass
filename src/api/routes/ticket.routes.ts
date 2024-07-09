import { Router } from 'express'
import TicketController from '../controllers/ticket.controller'

const router = Router({ mergeParams: true })
const ticketController = new TicketController()

router.post('/', ticketController.createTicket)
router.put('/:id', ticketController.UpdateTicket)
router.delete('/:id', ticketController.deleteTicket)

export default router
