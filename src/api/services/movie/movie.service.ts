import { CreateMovie } from './create-movie.provider'
import { DeleteMovie } from './delete-movie.provider'
import { ListMovie } from './list-movie.provider'
import { SearchMovie } from './search-movie.provider'
import { UpdateMovie } from './update-movie.provider'

export default class MovieService {
  createMovie = CreateMovie

  updateMovie = UpdateMovie

  deleteMovie = DeleteMovie

  searchMovie = SearchMovie

  listMovie = ListMovie
}
