import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RolesGuard } from 'src/auth/verifyRoles/roles.guard';
import { Role } from 'src/auth/verifyRoles/roles.decorator';
import { Roles } from 'src/auth/verifyRoles/roles';
import { ChangePasswordDTO } from './dto/change.password.dto';
import { AddProductToCartDTO } from './dto/add.product.to.cart.dto';
import { RemoveFromCartDTO } from './dto/remove.product.from.cart.dto';
import { getDataOptions } from './dto/get.data.options';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  @Get()
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ description: 'Profile successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'Profile not found.' })
  async getProfile(@Headers('authorization') token: string) {
    return this.profilesService.getProfile(token);
  }

  @Get('cart')
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get user cart' })
  @ApiOkResponse({ description: 'Cart successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'Cart not found.' })
  async getCart(@Headers('authorization') token: string) {
    return this.profilesService.getData(token, getDataOptions.Cart);
  }

  @Get('history')
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get order history' })
  @ApiOkResponse({ description: 'Order history successfully retrieved.' })
  @ApiNotFoundResponse({ description: 'Order history not found.' })
  async getOrderHistory(@Headers('authorization') token: string) {
    return this.profilesService.getData(token, getDataOptions.orderHistory);
  }

  @Patch('password')
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Change user password' })
  @ApiOkResponse({ description: 'Password successfully changed.' })
  @ApiUnauthorizedResponse({ description: 'Wrong password.' })
  @ApiNotFoundResponse({ description: 'Profile not found.' })
  async changePassword(
    @Headers('authorization') token: string,
    @Body() data: ChangePasswordDTO,
  ) {
    return this.profilesService.changePassword(token, data);
  }

  @Post('cart')
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiOkResponse({ description: 'Product successfully added to cart.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiNotFoundResponse({ description: 'Profile not found.' })
  async addProduct(
    @Headers('authorization') token: string,
    @Body() data: AddProductToCartDTO,
  ) {
    return this.profilesService.addProduct(token, data);
  }

  @Delete('cart')
  @Role([Roles.User, Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiOkResponse({ description: 'Product successfully removed from cart.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiNotFoundResponse({ description: 'Product not found in cart.' })
  async deleteFromCart(
    @Headers('authorization') token: string,
    @Body() productId: RemoveFromCartDTO,
  ) {
    return this.profilesService.deleteFromCart(token, productId);
  }
}
