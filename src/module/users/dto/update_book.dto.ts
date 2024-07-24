import { IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  surname: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(200)
  phone: string;

  @IsString()
  @MaxLength(200)
  email: string;

  @IsString()
  password: string;

  @IsString()
  was_born_date: string;
}
