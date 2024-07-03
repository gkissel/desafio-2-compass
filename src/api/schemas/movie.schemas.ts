import { z } from 'zod';

const movieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.date(),
  // sessions: z.array(
  //   z.object({
  //     id: z.number(),
  //     movie_id: z.number(),
  //     room: z.string(),
  //     capacity: z.number(),
  //     day: z.string(),
  //     time: z.string(),
  //     tickets: z.array(
  //       z.object({
  //         id: z.number(),
  //         session_id: z.number(),
  //         chair: z.string(),
  //         value: z.number(),
  //       }),
  //     ),
  //   }),
  // ),
});

const newMovieSchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  actors: z.array(z.string()),
  genre: z.string(),
  release_date: z.string(),
});

const createMovieSchema = newMovieSchema.omit({ id: true });
const updateMovieSchema = newMovieSchema;
const listMovieSchema = z.array(movieSchema);
const moviePaginationSchema = z.object({
  perPage: z.coerce.number().default(20),
  page: z.coerce.number().default(1),
});
const searchMovieSchema = z.object({
  id: z.coerce.number(),
});

export {
  movieSchema,
  newMovieSchema,
  createMovieSchema,
  updateMovieSchema,
  listMovieSchema,
  moviePaginationSchema,
  searchMovieSchema,
};
