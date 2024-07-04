import { z } from 'zod';

const sessionSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  room: z.string(),
  capacity: z.number().positive().default(100),
  day: z.string(),
  time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
});

const createSessionSchema = sessionSchema.omit({ id: true });
const newSessionSchema = sessionSchema.omit({ movie_id: true });
const updateSessionSchema = sessionSchema.omit({ movie_id: true });

export { sessionSchema, createSessionSchema, newSessionSchema, updateSessionSchema };
