import { Request, Response } from 'express'
import {
  createMovieSchema,
  moviePaginationSchema,
  updateMovieSchema,
} from '../schemas/movie.schemas'
import MovieService from '../services/movies/movie.service'

export default class MovieController {
  movieService = new MovieService()

  createMovie = async (req: Request, res: Response) => {
    try {
      const { error, data } = createMovieSchema.safeParse(req.body)

      if (error) {
        const err = {
          message: error.message,
          field: error.formErrors,
          status: 'Failed',
        }
        return res.status(400).json(err)
      }

      const createMovie = await this.movieService.createMovie(data)
      res.status(201).json(createMovie)
    } catch (error) {
      res.status(400).json( error )
    }
  }

  updateMovie = async (req: Request, res: Response) => {
    const { error, data } = updateMovieSchema.safeParse({
      ...req.body,
      id: parseInt(req.params.id),
    })

    if (error) {
      const err = {
        message: error.message,
        field: error.formErrors,
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      const updateMovie = await this.movieService.updateMovie(data)
      res.status(200).json(updateMovie)
    } catch (error) {
      res.status(400).json( error )
    }
  }

  deleteMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      const err = {
        message: 'Id must be a number',
        field: 'id',
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      await this.movieService.deleteMovie({ id })
      res.status(204).send()
    } catch (error) {
      res.status(500).json(error)
    }
  }

  searchMovie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      const err = {
        message: 'Id must be a number',
        field: 'id',
        status: 'Failed',
      }
      return res.status(400).json(err)
    }

    try {
      const movie = await this.movieService.searchMovie({ id })
      res.status(200).json(movie)
    } catch (error) {
      res.status(404).json( error )
    }
  }

  listMovies = async (req: Request, res: Response) => {
    const { page, perPage } = moviePaginationSchema.parse(req.query)

    try {
      const movies = await this.movieService.listMovie({ page, perPage })

      if (movies) {
        return res.status(200).json(movies)
      }

      res.status(204).send()
    } catch (error) {
      console.error('Error listing movies: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
