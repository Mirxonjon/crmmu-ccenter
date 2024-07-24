import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
} from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  region_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
