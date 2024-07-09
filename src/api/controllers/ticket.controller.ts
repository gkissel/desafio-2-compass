import { Request, Response } from 'express'
import TicketService from '../services/tickets/ticket.service'
import {
  createTicketSchema,
  updatedTicketSchema,
} from '../schemas/ticket.schemas'

export default class TicketController {
  ticketService = new TicketService()

  createTicket = async (req: Request, res: Response) => {
    const { movie_id, session_id } = req.params
    const { error, data } = createTicketSchema.safeParse({
      ...req.body,
      movie_id: parseInt(movie_id),
      session_id: parseInt(session_id),
    })

    if (error) {
      const err = {
        message: error.message,
        field: error.formErrors,
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      const createTicket = await this.ticketService.createTicket(data)
      res.status(201).json(createTicket)
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }

  UpdateTicket = async (req: Request, res: Response) => {
    const { session_id } = req.params
    const { error, data } = updatedTicketSchema.safeParse({
      ...req.body,
      id: parseInt(req.params.id),
      session_id: parseInt(session_id),
    })

    if (error) {
      const err = {
        message: error.message,
        field: error.formErrors,
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      const updateTicket = await this.ticketService.updateTicket(data)
      res.status(200).json(updateTicket)
    } catch (error) {
      console.error('Error updating ticket: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  deleteTicket = async (req: Request, res: Response) => {
    const session_id = parseInt(req.params.session_id)
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      const err = {
        message: 'Id must be a number',
        field: 'id',
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      await this.ticketService.deleteTicket(id, session_id)
      res.status(204).send()
    } catch (error) {
      console.error('Error deleting ticket: ', error)
      res.status(500).json({ error: 'Internal Serve Error' })
    }
  }
}
