import { Service, Inject } from 'typedi';
import { IModels } from '../database/models';
import { Session } from '../core/domain/session';
import { SessionDto } from '../core/dto';
import 'reflect-metadata';

interface ISessionRepositiory {
  save(user: Partial<Session>): Promise<SessionDto | null>;
}

@Service()
export default class SessionRepository implements ISessionRepositiory {
  constructor(@Inject('models') private Models: IModels) {}

  private createBaseQuery() {
    return {
      where: {},
    };
  }

  async findOne(query: Partial<Session>): Promise<SessionDto> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where = { ...query };
    return await this.Models.Session.findOne({ ...baseQuery, raw: true });
  }

  async save(session: any): Promise<SessionDto | null> {
    return await this.Models.Session.create(session);
  }
}
