import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from 'src/order/dto/order.status.options';

export class ChangeOrderStatusDTO {
  @ApiProperty({
    description: 'The ID of the order whose status will be changed.',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The new status to set for the order.',
    enum: OrderStatus,
    example: OrderStatus.Pending,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
