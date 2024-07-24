import { IsEmpty, IsIn, IsObject, IsString, MaxLength } from 'class-validator';

export class UpdateDistrictDto {
  region_id: string;

  @IsString()
  title: string;
}
