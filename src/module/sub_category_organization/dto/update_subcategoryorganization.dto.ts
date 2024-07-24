import { IsEmpty, IsIn, IsObject, IsString, MaxLength } from 'class-validator';

export class UpdateSubCategorySectionDto {
  category_id: string;

  @IsString()
  title: string;
}
