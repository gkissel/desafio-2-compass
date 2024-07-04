import { z } from 'zod';

const sessionSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  room: z.string(),
  capacity: z.number(),
  day: z.string(),
  time: z.string(),
});

const createSessionSchema = sessionSchema.omit({ id: true });
const newSessionSchema = sessionSchema.omit({ movie_id: true });

export { sessionSchema, createSessionSchema, newSessionSchema };
