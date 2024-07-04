import { z } from 'zod';
import {
  createSessionSchema,
  newSessionSchema,
  sessionSchema,
} from '../schemas/session.schemas';

type sessionData = z.infer<typeof sessionSchema>;
type createSessionData = z.infer<typeof createSessionSchema>;
type newSessionData = z.infer<typeof newSessionSchema>;

export { sessionData, createSessionData, newSessionData };
