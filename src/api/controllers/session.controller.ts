import { Request, Response } from 'express';
import { createSessionSchema } from '../schemas/session.schemas';
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
}
