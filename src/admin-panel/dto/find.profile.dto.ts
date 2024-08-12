import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum ProfileSearch {
  id = 'id',
  _id = '_id',
}

export class FindProfileDTO {
  @ApiProperty({
    description: 'The key by which the profile will be searched.',
    enum: ProfileSearch,
    example: ProfileSearch.id,
  })
  @IsNotEmpty()
  @IsEnum(ProfileSearch)
  key: ProfileSearch;

  @ApiProperty({
    description: 'The value associated with the key to search the profile.',
    example: '1234567890',
  })
  @IsNotEmpty()
  value: string;
}
