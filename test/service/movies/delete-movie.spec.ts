import { MovieRepository } from '@/api/repositories/MovieRepository';
import { DeleteMovie } from '@/api/services/movies/delete-movie.provider';
import { Timestamp } from 'typeorm';
import { describe, expect, it, vi } from 'vitest';

describe('Delete Movie Tests', () => {
  it('should delete a movie when it exists', async () => {
    const movie = {
      id: 1,
      image: 'image_url',
      name: 'Existing Movie',
      actors: ['Actor 1', 'Actor 2'],
      description: 'A great movie',
      genre: 'Action',
      release_date: '01/01/2023',
    };

    const expectedMovie = {
      ...movie,
      release_date: new Date('01/01/2023'),
      created_at: new Date('01/01/2023') as unknown as Timestamp,
      deleted_at: new Date('01/01/2023') as unknown as Timestamp,
      updated_at: new Date('01/01/2023') as unknown as Timestamp,
      sessions: [],
    };

    const mockFindOne = vi
      .spyOn(MovieRepository, 'findOne')
      .mockResolvedValue(expectedMovie);
    const mockRemove = vi
      .spyOn(MovieRepository, 'remove')
      .mockResolvedValue(expectedMovie);

    await DeleteMovie({ id: 1 });

    expect(mockFindOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRemove).toHaveBeenCalledWith(expectedMovie);

    mockFindOne.mockRestore();
    mockRemove.mockRestore();
  });
});
