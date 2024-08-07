import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class CreateApplicationCallCenterDto {
  @IsString()
  // @IsNotEmpty()
  sub_category_id: string;

  @IsString()
  district_id: string;

  @IsString()
  applicant: string;

  @IsString()
  application_type: string;

  @IsString()
  comment: string;
  // @IsString()
  // income_number: string;

  @IsString()
  phone: string;
  // @IsString()
  // crossfields: string;

  @IsString()
  income_date: string;

  // @IsString()
  // @IsNotEmpty()
  // incoming_number: string;

  @IsString()
  organization_name: string;

  @IsString()
  organization_type: string;

  @IsString()
  perform_date: string;

  @IsString()
  performer: string;

  @IsString()
  resend_application: string;

  @IsString()
  response: string;

  @IsString()
  sended_to_organizations: string;

  @IsString()
  IsDraf: string;

  applicant_birthday: string;

  mfy: string;

  street_and_appartment: string;

  operator_number: string;

  additional_phone: string;

  gender: string;
}
