import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { RolesGuard } from 'src/auth/verifyRoles/roles.guard';
import { Role } from 'src/auth/verifyRoles/roles.decorator';
import { Roles } from 'src/auth/verifyRoles/roles';
import { CreateOrderDTO } from './dto/create.order.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Create a new order' })
  @ApiOkResponse({ description: 'Order successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid data.' })
  @ApiNotFoundResponse({ description: 'Cart is empty.' })
  async createOrder(
    @Headers('authorization') token: string,
    @Body() orderData: CreateOrderDTO,
  ) {
    return this.orderService.makeOrder(token, orderData);
  }
}
