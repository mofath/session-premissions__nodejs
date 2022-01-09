import UserRepository from '../repositories/user.repository';
import Container from 'typedi';
import { CreateUserDto } from '../core/dto';
import { ConflictError } from '../core/errors';
import 'reflect-metadata';

export class CreateUserUseCase {
  public static async execute(params: CreateUserDto): Promise<any> {
    const userRepo = Container.get(UserRepository);
    const user = await userRepo.findOne({ username: params.username });
    if (user) throw new ConflictError('User Already exist!');
    return await userRepo.save(params);
  }
}
