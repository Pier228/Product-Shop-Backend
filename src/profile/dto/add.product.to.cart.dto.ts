import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductDTO } from 'src/products/dto/create.product.dto';

export class AddProductToCartDTO extends CreateProductDTO {
  @ApiProperty({
    description: 'The id of product',
    example: 'as2kbfp121asi120',
  })
  @IsNotEmpty()
  _id: string;
}
