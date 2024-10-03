export interface CustomRequest extends Request {
  userId: string;
  // role: string;
}

export interface CustomHeaders extends Headers {
  authorization: string;
}

export enum RolesEnum {
  OPERATOR = 'operator',
  ADMIN = 'admin',
}


export enum ApplicationStatuses {
  New = 'Янги',
  Process = 'Кўриб чиқиш жараёнида',
  Extended = 'Кўриб чиқиш жараёни чўздирилган',
  Expired = 'Мурожаат муддати ўтган',
  Processed = 'Кўриб чиқилган'
}