import { Request, Response } from 'express';
import TicketService from '../services/tickets/ticket.service';
import { createTicketSchema } from '../schemas/ticket.schemas';

export default class SessionController {
  ticketService = new TicketService();

  createSession = async (req: Request, res: Response) => {
    const { movie_id, session_id } = req.params;
    const { error, data } = createTicketSchema.safeParse({
      ...req.body,
      movie_id: parseInt(movie_id),
      session_id: parseInt(session_id),
    });

    if (error) {
      const err = {
        message: error.message,
        field: error.formErrors,
        status: 'Failed',
      };
      return res.status(400).json(err);
    }

    try {
      const createTicket = await this.ticketService.createTicket(data);
      res.status(201).json(createTicket);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
}
