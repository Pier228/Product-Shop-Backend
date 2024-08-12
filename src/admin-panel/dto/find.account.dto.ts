import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SearchParams {
  _id = '_id',
  login = 'login',
  email = 'email',
  role = 'role',
}

export class FindAccountDTO {
  @ApiProperty({
    description: 'The key by which the account will be searched.',
    enum: SearchParams,
    example: SearchParams.role,
  })
  @IsNotEmpty()
  @IsEnum(SearchParams)
  key: SearchParams;

  @ApiProperty({
    description: 'The value associated with the key to search the account.',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  value: string;
}
