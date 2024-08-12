import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { RolesGuard } from 'src/auth/verifyRoles/roles.guard';
import { Role } from 'src/auth/verifyRoles/roles.decorator';
import { Roles } from 'src/auth/verifyRoles/roles';
import { FindAccountDTO, SearchParams } from './dto/find.account.dto';
import { SearchLimitDTO } from './dto/search.limit.dto';
import { GrantRoleDTO } from './dto/grant.role.dto';
import { FindProfileDTO, ProfileSearch } from './dto/find.profile.dto';
import { DataBaseOptions } from './dto/database.options';
import { OrderStatus } from 'src/order/dto/order.status.options';
import { ChangeOrderStatusDTO } from './dto/change.order.status.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Admin panel')
@Controller('admin-panel')
@UseGuards(RolesGuard)
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Get('account/:id')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the account',
    example: '1234567890',
  })
  @ApiOkResponse({ description: 'Account successfully found' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiBadRequestResponse({ description: 'Invalid user id' })
  async getAccountById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.userModel, {
      key: SearchParams._id,
      value: id,
    });
  }

  @Get('account')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Find an account using search parameters' })
  @ApiBody({
    type: FindAccountDTO,
    description: 'Search parameters for finding an account',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Account successfully found' })
  @ApiNotFoundResponse({ description: 'Account not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async findAccount(
    @Body() params: FindAccountDTO,
    @Query() query: SearchLimitDTO,
  ) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.userModel,
      params,
      query?.limit,
    );
  }

  @Get('accounts')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get all accounts with optional limit' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Accounts successfully found' })
  @ApiNotFoundResponse({ description: 'Accounts not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async getAllAccounts(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.userModel,
      undefined,
      query?.limit,
    );
  }

  @Get('profile/:id')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the profile',
    example: '1234567890',
  })
  @ApiOkResponse({ description: 'Profile successfully found' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async getProfileById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.profileModel, {
      key: ProfileSearch._id,
      value: id,
    });
  }

  @Get('profile')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Find a profile using search parameters' })
  @ApiBody({
    type: FindProfileDTO,
    description: 'Search parameters for finding a profile',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Profile successfully found' })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async findProfile(
    @Body() params: FindProfileDTO,
    @Query() query: SearchLimitDTO,
  ) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.profileModel,
      params,
      query?.limit,
    );
  }

  @Get('profiles')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get all profiles with optional limit' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Profiles successfully found' })
  @ApiNotFoundResponse({ description: 'Profiles not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async getAllProfiles(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.profileModel,
      undefined,
      query?.limit,
    );
  }

  @Patch('grantRole')
  @Role([Roles.Admin])
  @ApiOperation({ summary: 'Grant a role to a user' })
  @ApiBody({ type: GrantRoleDTO, description: 'Details for granting a role' })
  @ApiOkResponse({ description: 'Role granted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input or operation' })
  @ApiForbiddenResponse({
    description: "You don't have enough rights to use this functionality!",
  })
  @ApiConflictResponse({ description: 'This user already has this role' })
  async grantRole(@Body() grantRole: GrantRoleDTO) {
    return this.adminPanelService.grantRole(grantRole);
  }

  @Get('order/:id')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the order',
    example: '1234567890',
  })
  @ApiOkResponse({ description: 'Order retrieved successfully' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getOrderById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.orderModel, {
      key: ProfileSearch._id,
      value: id,
    });
  }

  @Get('orders/:status')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get orders by status' })
  @ApiParam({
    name: 'status',
    description: 'The status of the orders',
    enum: OrderStatus,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Orders retrieved successfully' })
  @ApiNotFoundResponse({
    description: 'No orders found with the specified status',
  })
  async getOrdersByStatus(
    @Param('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Query() query: SearchLimitDTO,
  ) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.orderModel,
      {
        key: 'status',
        value: status,
      },
      query?.limit,
    );
  }

  @Get('orders')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Get all orders with optional limit' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiOkResponse({ description: 'Orders retrieved successfully' })
  @ApiNotFoundResponse({ description: 'No orders found' })
  async getOrders(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.orderModel,
      undefined,
      query?.limit,
    );
  }

  @Patch('order')
  @Role([Roles.Admin, Roles.Moderator])
  @ApiOperation({ summary: 'Change the status of an order' })
  @ApiBody({
    type: ChangeOrderStatusDTO,
    description: 'Details for changing the order status',
  })
  @ApiOkResponse({ description: 'Order status changed successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input or operation' })
  @ApiConflictResponse({
    description: 'Order with this id is already has this status',
  })
  async changeOrderStatus(@Body() params: ChangeOrderStatusDTO) {
    return this.adminPanelService.changeOrderStatus(params);
  }
}
