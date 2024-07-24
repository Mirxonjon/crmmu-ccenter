import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
} from 'class-validator';

export class CreateSubCategorySectionDto {
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
