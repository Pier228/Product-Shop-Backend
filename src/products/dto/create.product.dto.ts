import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({
    description: 'The title of the product',
    example: 'Milk',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 29.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'A description of the product',
    example: 'Description of Product A',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL of the product image',
    example: 'https://example.com/product-a.jpg',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
