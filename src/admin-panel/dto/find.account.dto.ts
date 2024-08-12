import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SearchParams {
  _id = '_id',
  login = 'login',
  email = 'email',
  role = 'role',
}

export class FindAccountDTO {
  @IsNotEmpty()
  @IsEnum(SearchParams)
  key: SearchParams;

  @IsNotEmpty()
  value: string;
}
