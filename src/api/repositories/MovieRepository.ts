import { AppDataSource } from '@/database/data-source';
import { Movie } from '../entity/movie.entity';

export const MovieRepository = AppDataSource.getRepository(Movie).extend({
  async findByName(name: string): Promise<Movie | null> {
    return this.findOne({ where: { name } });
  },
});
