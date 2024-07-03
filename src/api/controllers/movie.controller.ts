import { Request, Response } from 'express'
import { createMovieRequestSchema } from '../services/movie/create-movie.provider'
import { listMovieRequestSchema } from '../services/movie/list-movie.provider'
import MovieService from '../services/movie/movie.service'
import { updateMovieRequestSchema } from '../services/movie/update-movie.provider'

export default class MovieController {
  movieService = new MovieService()

  createMovie = async (req: Request, res: Response) => {
    try {
      const { error, data } = createMovieRequestSchema.safeParse(req.body)

      if (error) {
        const err = {
          message: error.message,
          field: error.formErrors,
          status: 'Failed',
        }
        return res.status(400).json(err)
      }
      const createMovie = await this.movieService.createMovie(data)
      res.status(201).json({ data: createMovie })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  updateMovie = async (req: Request, res: Response) => {
    const { error, data } = updateMovieRequestSchema.safeParse({
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
      res.status(200).json({ data: updateMovie })
    } catch (error) {
      console.error('Error updating movie: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
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
      res.status(500).json({ message: error.message })
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

      res.status(200).json({ data: movie })
    } catch (error) {
      console.error('Error searching movie: ', error)
      res.status(404).json({ error: 'Movie not found' })
    }
  }

  listMovies = async (req: Request, res: Response) => {
    const { page, perPage } = listMovieRequestSchema.parse(req.query)

    try {
      const movies = await this.movieService.listMovie({ page, perPage })
      if (movies) {
        return res.status(200).json({ data: movies })
      }
      res.status(204).send()
    } catch (error) {
      console.error('Error listing movies: ', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
