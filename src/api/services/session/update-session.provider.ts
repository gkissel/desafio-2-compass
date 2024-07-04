import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error'
import { SessionRepository } from '@/api/repositories/SessionRepository'
import {newSessionSchema, updateSessionSchema} from '@/api/schemas/session.schemas'
import { newSessionData, updateSessionData } from '@/api/types/session.types'

export const UpdateSession = async (sesionDate: updateSessionData): Promise<newSessionData> => {
    const { id, room, capacity, day, time } = updateSessionSchema.parse(sesionDate)

    const session = await SessionRepository.findOne({ where: { id }})

    if(!session){
        throw new ResourceNotFoundError()
    }

    session.room = room
    session.capacity = capacity
    session.day = day
    session.time = time

    const updatedSession = await SessionRepository.save(session)

    return newSessionSchema.parse(updatedSession)
}