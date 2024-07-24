import { IsString, MaxLength } from 'class-validator';

export class SingInUserDto {
  @IsString()
  @MaxLength(200)
  username: string;

  @IsString()
  @MaxLength(200)
  password: string;
}
