import { MovieRepository } from '@/api/repositories/MovieRepository';
import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { UpdateMovie } from '@/api/services/movies/update-movie.provider';
import { describe, expect, it, vi, afterEach } from 'vitest';

describe('Update Movie Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw ResourceNotFoundError when movie does not exist', async () => {
    const movieData = {
      id: 1212,
      actors: ['Updated Actor 1', 'Updated Actor 2'],
      description: 'Updated movie description',
      genre: 'Comedy',
      image: 'updated_image_url',
      name: 'Updated Movie',
      release_date: '2024-01-01',
    };

    const mockFindOne = vi
      .spyOn(MovieRepository, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(UpdateMovie(movieData)).rejects.toThrow(ResourceNotFoundError);

    expect(mockFindOne).toHaveBeenCalledWith({ where: { id: movieData.id } });
  });
});
