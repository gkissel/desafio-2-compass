import { z } from 'zod';
import {
  createSessionSchema,
  newSessionSchema,
  sessionSchema,
  updateSessionSchema
} from '../schemas/session.schemas';

type sessionData = z.infer<typeof sessionSchema>;
type createSessionData = z.infer<typeof createSessionSchema>;
type newSessionData = z.infer<typeof newSessionSchema>;
type updateSessionData = z.infer<typeof updateSessionSchema>

export { sessionData, createSessionData, newSessionData, updateSessionData };
