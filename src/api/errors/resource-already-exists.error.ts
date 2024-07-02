import { ServiceError } from './service-error'

export class ResourceAlreadyExistsError extends Error implements ServiceError {
  constructor({
    indentifier,
    resource,
  }: {
    resource: string
    indentifier: string
  }) {
    super(`${resource} with ${indentifier} already exists`)
  }
}
