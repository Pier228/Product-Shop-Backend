import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'src/order/dto/order.status.options';

export class FindOrderDTO {
  @IsNotEmpty()
  key: 'status';

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  value: OrderStatus;
}
