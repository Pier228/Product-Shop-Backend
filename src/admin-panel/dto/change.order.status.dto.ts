import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from 'src/order/dto/order.status.options';

export class ChangeOrderStatusDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
