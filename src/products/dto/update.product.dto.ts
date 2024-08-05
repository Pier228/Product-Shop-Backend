import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProductDTO } from './create.product.dto';
import { Type } from 'class-transformer';

export class updateProductDTO {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 1,
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Data to update in the product',
    example: { title: 'New Product Title', price: 99.99 },
  })
  @ValidateNested()
  @Type(() => PartialType(CreateProductDTO))
  data: Partial<CreateProductDTO>;
}
