import { ServiceError } from './service-error';

export class TicketSessionError extends Error implements ServiceError {
  constructor() {
    super('This ticket is not in the correct section');
  }
}
