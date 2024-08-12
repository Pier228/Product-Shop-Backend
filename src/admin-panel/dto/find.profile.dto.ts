import { IsEnum, IsNotEmpty } from 'class-validator';

export enum ProfileSearch {
  id = 'id',
  _id = '_id',
}

export class FindProfileDTO {
  @IsNotEmpty()
  @IsEnum(ProfileSearch)
  key: ProfileSearch;

  @IsNotEmpty()
  value: string;
}
