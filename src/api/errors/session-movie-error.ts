import { ServiceError } from './service-error';

export class SessionMovieError extends Error implements ServiceError {
  constructor() {
    super('This session is not showing the specified movie.');
  }
}
