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
