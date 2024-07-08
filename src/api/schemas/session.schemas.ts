import { z } from 'zod';
import { ticketSchema } from './ticket.schemas';

// Regra para o formato de horário ser 00:00:00 até 23:59:59
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

//Regra para o formato de data ser 01/01/2000 até 12/12/2200
const dayRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const validateDay = (day: string) => {
  if (!dayRegex.test(day)) {
    return false;
  }

  const [days, months, years] = day.split('/').map(Number);

  if (days < 1 || days > 31) return false;
  if (months < 1 || months > 12) return false;
  if (years < 2000 || years > 2200) return false;

  return true;
};

const sessionTicketSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  room: z.string(),
  capacity: z.number().positive().default(100),
  day: z.string().refine(validateDay),
  time: z.string().refine(validateTime),
  tickets: z.optional(z.array(ticketSchema)),
});

const sessionSchema = sessionTicketSchema.omit({ tickets: true });

const createSessionSchema = sessionSchema.omit({ id: true });

const newSessionSchema = sessionSchema.omit({ movie_id: true });

const updateSessionSchema = sessionSchema;


export {
  sessionSchema,
  createSessionSchema,
  newSessionSchema,
  updateSessionSchema,
  sessionTicketSchema,
};
