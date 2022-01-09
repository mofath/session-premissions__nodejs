import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Session } from '../domain/session';

@Exclude()
export class CreateSessionDto
  implements Omit<Session, 'id' | 'createdAt' | 'revoked'>
{
  @Expose()
  @IsNotEmpty()
  public id: string;
  
  @Expose()
  @IsNotEmpty()
  public userId: string;

  @Expose()
  @IsNotEmpty()
  public scope: string;

  @Expose()
  @IsNotEmpty()
  public tokenHash: string;

  @Expose()
  @IsNotEmpty()
  public validUntil: Date;
}
