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

@Controller('admin-panel')
@UseGuards(RolesGuard)
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Get('account/:id')
  @Role([Roles.Admin, Roles.Moderator])
  async getAccountById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.userModel, {
      key: SearchParams._id,
      value: id,
    });
  }

  @Get('account')
  @Role([Roles.Admin, Roles.Moderator])
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
  async getAllAccounts(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.userModel,
      undefined,
      query?.limit,
    );
  }

  @Get('profile/:id')
  @Role([Roles.Admin, Roles.Moderator])
  async getProfileById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.profileModel, {
      key: ProfileSearch._id,
      value: id,
    });
  }

  @Get('profile')
  @Role([Roles.Admin, Roles.Moderator])
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
  async getAllProfiles(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.profileModel,
      undefined,
      query?.limit,
    );
  }

  @Patch('grantRole')
  @Role([Roles.Admin])
  async grantRole(@Body() grantRole: GrantRoleDTO) {
    return this.adminPanelService.grantRole(grantRole);
  }

  @Get('order/:id')
  @Role([Roles.Admin, Roles.Moderator])
  async getOrderById(@Param('id') id: string) {
    return this.adminPanelService.findDocument(DataBaseOptions.orderModel, {
      key: ProfileSearch._id,
      value: id,
    });
  }

  @Get('orders/:status')
  @Role([Roles.Admin, Roles.Moderator])
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
  async getOrders(@Query() query: SearchLimitDTO) {
    return this.adminPanelService.findDocument(
      DataBaseOptions.orderModel,
      undefined,
      query?.limit,
    );
  }

  @Patch('order')
  @Role([Roles.Admin, Roles.Moderator])
  async changeOrderStatus(@Body() params: ChangeOrderStatusDTO) {
    return this.adminPanelService.changeOrderStatus(params);
  }
}
