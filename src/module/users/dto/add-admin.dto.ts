import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddAdminDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
