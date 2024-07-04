import { AppDataSource } from '@/database/data-source'
import { Session } from '../entity/session.entity'

export const SessionRepository = AppDataSource.getRepository(Session).extend({})
