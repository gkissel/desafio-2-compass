import { ResourceNotFoundError } from '@/api/errors/resource-not-found.error';
import { SessionRepository } from '@/api/repositories/SessionRepository';

export const DeleteSession = async (id: number): Promise<void> => {
    const session = await SessionRepository.findOne({ where: { id } });
  
    if (!session) {
      throw new ResourceNotFoundError();
    }
  
    await SessionRepository.remove(session);
  };