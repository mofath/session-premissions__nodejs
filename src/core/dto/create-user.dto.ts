import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, Length, IsDefined } from 'class-validator';
import { Role } from '../domain/enum';
import { User } from '../domain/user';

@Exclude()
export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'isVerified'>
{
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @Expose()
  @Length(3, 20)
  @IsDefined()
  readonly password: string;

  @Expose()
  readonly role: Role;
}
