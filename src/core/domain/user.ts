import { Role } from './enum';

export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public role: Role,
    public isVerified: boolean,
    public createdAt: Date
  ) {}
}
