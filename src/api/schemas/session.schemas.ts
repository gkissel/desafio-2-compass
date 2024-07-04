import { z } from 'zod';

//Regra pra o formato de horário ser 00:00:00 até 23:59:59
const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
const validateTime = (time: string) => {
  if (!timeRegex.test(time)) {
    return false;
  }

  const [hours, minutes, seconds] = time.split(':').map(Number);

  if (hours < 0 || hours > 23) return false;
  if (minutes < 0 || minutes > 59) return false;
  if (seconds < 0 || seconds > 59) return false;

  return true;
};

const sessionSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  room: z.string(),
  capacity: z.number().positive().default(100),
  day: z.string(),
  time: z.string().refine(validateTime),
});

const createSessionSchema = sessionSchema.omit({ id: true });
const newSessionSchema = sessionSchema.omit({ movie_id: true });
const updateSessionSchema = sessionSchema;

export { sessionSchema, createSessionSchema, newSessionSchema, updateSessionSchema };
