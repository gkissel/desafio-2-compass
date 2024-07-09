import { MovieRepository } from '@/api/repositories/MovieRepository'
import { movieSchema, newMovieSchema } from '@/api/schemas/movie.schemas'
import { CreateMovie } from '@/api/services/movies/create-movie.provider'
import { Timestamp } from 'typeorm'
import { describe, expect, it, vi } from 'vitest'

describe('Create Movie Tests', () => {
  it('should create a movie when all required fields are valid', async () => {
    const movieData = {
      actors: ['Actor 1', 'Actor 2'],
      description: 'A great movie',
      genre: 'Action',
      image: 'image_url',
      name: 'New Movie',
      release_date: '01/01/2023',
      id: 123123123,
    }

    const createdMovie = movieSchema.parse({
      ...movieData,
      release_date: new Date('01/01/2023'),
    })
    const mockExists = vi
      .spyOn(MovieRepository, 'exists')
      .mockResolvedValue(false)
    const mockCreate = vi.spyOn(MovieRepository, 'create').mockReturnValue({
      ...createdMovie,
      release_date: new Date('01/01/2023'),
      created_at: new Date('01/01/2023') as unknown as Timestamp,
      deleted_at: new Date('01/01/2023') as unknown as Timestamp,
      updated_at: new Date('01/01/2023') as unknown as Timestamp,
      sessions: [],
    })
    const mockSave = vi.spyOn(MovieRepository, 'save').mockResolvedValue({
      ...createdMovie,
      release_date: new Date('01/01/2023'),
      created_at: new Date('01/01/2023') as unknown as Timestamp,
      deleted_at: new Date('01/01/2023') as unknown as Timestamp,
      updated_at: new Date('01/01/2023') as unknown as Timestamp,
      sessions: [],
    })

    const result = await CreateMovie(movieData)

    expect(mockExists).toHaveBeenCalledWith({ where: { name: movieData.name } })

    expect(mockSave).toHaveBeenCalledWith({
      ...createdMovie,
      release_date: new Date('01/01/2023'),
      created_at: new Date('01/01/2023') as unknown as Timestamp,
      deleted_at: new Date('01/01/2023') as unknown as Timestamp,
      updated_at: new Date('01/01/2023') as unknown as Timestamp,
      sessions: [],
    })
    expect(result).toEqual(newMovieSchema.parse(createdMovie))

    mockExists.mockRestore()
    mockCreate.mockRestore()
    mockSave.mockRestore()
  })

  it('should throw an error when movie name already exists in the repository', async () => {
    const movieData = {
      actors: ['Actor 1', 'Actor 2'],
      description: 'A great movie',
      genre: 'Action',
      image: 'image_url',
      name: 'Existing Movie',
      release_date: '01/01/2023',
    }

    const mockExists = vi
      .spyOn(MovieRepository, 'exists')
      .mockResolvedValue(true)

    await expect(CreateMovie(movieData)).rejects.toThrow(
      'Movie name already registered',
    )

    expect(mockExists).toHaveBeenCalledWith({ where: { name: movieData.name } })

    mockExists.mockRestore()
  })
})
