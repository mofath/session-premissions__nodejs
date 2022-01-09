import { Expose, Exclude } from 'class-transformer';
import { IsString, IsDefined } from 'class-validator';
import { Resource } from '../domain/resource';

@Exclude()
export class CreateResourceDto implements Omit<Resource, 'id'> {
  @Expose()
  @IsString()
  @IsDefined()
  readonly title: string;
}
