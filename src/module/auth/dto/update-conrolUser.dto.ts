import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateControlUserDto {

  @IsString()
  full_name: string;

  @IsString()
  operator_number: string;



  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
