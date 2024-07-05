import { Request, Response } from 'express';
import {
  createSessionSchema,
  updateSessionSchema,
} from '../schemas/session.schemas';
import SessionService from '../services/session/session.service';

export default class SessionController {
  sessionService = new SessionService();

  createSession = async (req: Request, res: Response) => {
    const { movie_id } = req.params;
    const { error, data } = createSessionSchema.safeParse({
      ...req.body,
      movie_id: parseInt(movie_id),
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
      const createSession = await this.sessionService.createSession(data);
      res.status(201).json(createSession);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };

  updateSession = async (req: Request, res: Response) => {
    const { movie_id } = req.params;
    const { error, data } = updateSessionSchema.safeParse({
      ...req.body,
      id: parseInt(req.params.id),
      movie_id: parseInt(movie_id),
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
      const updateSession = await this.sessionService.updateSession(data);
      res.status(200).json(updateSession);
    } catch (error) {
      console.error('Error updating session: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  deleteSession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      const err = {
        message: 'Id must be a number',
        field: 'id',
        status: 'Failed',
      };
      return res.status(400).json(err);
    }

    try {
      await this.sessionService.deleteSession(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting session: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

}

