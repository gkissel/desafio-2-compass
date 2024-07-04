import { z } from 'zod';

const sessionSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  room: z.string(),
  capacity: z.number().positive().default(100),
  day: z.string(),
  time: z.string(),
});

const createSessionSchema = sessionSchema.omit({ id: true });
const newSessionSchema = sessionSchema.omit({ movie_id: true });
const updateSessionSchema = sessionSchema;

export { sessionSchema, createSessionSchema, newSessionSchema, updateSessionSchema };
