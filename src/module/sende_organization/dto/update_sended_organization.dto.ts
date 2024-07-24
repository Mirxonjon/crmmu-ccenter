import { IsString, MaxLength } from 'class-validator';

export class UpdateSendedOrganizationDto {
  @IsString()
  @MaxLength(200)
  title: string;

  // @IsString()
  // @MaxLength(200)
  // title_ru: string;

  // @IsString()
  // tactic_category: string;
}
