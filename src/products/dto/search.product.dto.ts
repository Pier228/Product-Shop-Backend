import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchProductDTO {
  @ApiProperty({
    description: 'Search by the title of the product',
    example: 'Milk',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Search by the price of the product. Provide a numeric value.',
    example: '29.99',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Search by the category of the product',
    example: 'Electronics',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Search by the description of the product',
    example: 'Description of Product A',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
