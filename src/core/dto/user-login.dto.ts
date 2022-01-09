import { IsNotEmpty, IsString, Length, IsDefined } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsString()
  @Length(3, 20)
  @IsDefined()
  readonly password: string;
}
