import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveFromCartDTO {
  @ApiProperty({
    description: 'The id of product',
    example: 'productId123231',
  })
  @IsNotEmpty()
  productId: string;
}
