import { z } from 'zod';
import { sessionTicketSchema } from './session.schemas';

const movieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string().max(100),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.date().transform((date) => {
    return date.toLocaleDateString('pt-BR');
  }),
  sessions: z.optional(z.array(sessionTicketSchema))
});

const newMovieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string().max(100),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.coerce.date().transform((date) => {
    return date.toLocaleDateString('pt-BR');
  }),
});

const createMovieSchema = newMovieSchema
  .omit({ id: true, release_date: true })
  .extend({
    release_date: z.string().transform((date) => {
      const [dd, mm, yyyy] = date.split('/');
      return `${yyyy}-${mm}-${dd}`;
    }),
  });

const updateMovieSchema = newMovieSchema.omit({ release_date: true }).extend({
  release_date: z.string().transform((date) => {
    const [dd, mm, yyyy] = date.split('/');
    return `${yyyy}-${mm}-${dd}`;
  }),
});

const listMovieSchema = z.array(movieSchema);
const moviePaginationSchema = z.object({
  perPage: z.coerce.number().default(20),
  page: z.coerce.number().default(1),
});
const searchMovieSchema = z.object({
  id: z.coerce.number(),
});

export {
  createMovieSchema,
  listMovieSchema,
  moviePaginationSchema,
  movieSchema,
  newMovieSchema,
  searchMovieSchema,
  updateMovieSchema,
};

