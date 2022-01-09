import { Service, Inject } from 'typedi';
import { IModels } from '../database/models';
import { User } from '../core/domain/user';
import 'reflect-metadata';

interface ISessionRepositiory {
  exists(id: string): Promise<boolean>;
  findOne(params: Partial<User>): Promise<User>;
  save(user: Partial<User>): Promise<User | null>;
}

@Service()
export default class UserRepository implements ISessionRepositiory {
  constructor(@Inject('models') private Models: IModels) {}

  private createBaseQuery() {
    return {
      where: {},
    };
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.Models.User.findOne({ where: { id }, raw: true });
    return !!user === true;
  }

  async findOne(query: Partial<User>): Promise<any> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where = { ...query };
    return await this.Models.User.findOne({ ...baseQuery });
  }

  async save(user: Partial<User>): Promise<User | null> {
    return await this.Models.User.create(user);
  }
}
