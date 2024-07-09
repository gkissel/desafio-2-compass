import { CreateSession } from './create-session.provider'
import { UpdateSession } from './update-session.provider'
import { DeleteSession } from './delete-session.provider'

export default class SessionService {
  createSession = CreateSession

  updateSession = UpdateSession

  deleteSession = DeleteSession
}
