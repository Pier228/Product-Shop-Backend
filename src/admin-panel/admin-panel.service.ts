import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/models/userSchema';
import { FindAccountDTO, SearchParams } from './dto/find.account.dto';
import { defaultSearchResultLimit } from 'src/consts ';
import { Roles } from 'src/auth/verifyRoles/roles';
import { GrantRoleDTO } from './dto/grant.role.dto';
import { FindProfileDTO } from './dto/find.profile.dto';
import { DataBaseOptions } from './dto/database.options';
import { Profile } from 'src/auth/models/profileSchema';
import { Order } from 'src/order/model/order.schema';
import { FindOrderDTO } from './dto/find.order.dto';
import { ChangeOrderStatusDTO } from './dto/change.order.status.dto';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectModel(User.name, 'auth') private userModel: Model<User>,
    @InjectModel(Profile.name, 'profiles') private profileModel: Model<Profile>,
    @InjectModel(Order.name, 'orders') private orderModel: Model<Order>,
  ) {}

  async findDocument(
    database: DataBaseOptions,
    params?: FindAccountDTO | FindProfileDTO | FindOrderDTO,
    limit?: number,
  ) {
    try {
      if (params?.key == '_id' || params?.key == 'id') {
        this.isValidObjectId(params.value);
      }

      let accounts;

      switch (database) {
        case DataBaseOptions.userModel:
          accounts = await this.userModel
            .find(
              params && {
                [params.key]: [params.value],
              },
            )
            .limit(limit || defaultSearchResultLimit)
            .exec();
          break;

        case DataBaseOptions.profileModel:
          accounts = await this.profileModel
            .find(
              params && {
                [params.key]: [params.value],
              },
            )
            .limit(limit || defaultSearchResultLimit)
            .exec();
          break;

        case DataBaseOptions.orderModel:
          accounts = await this.orderModel
            .find(
              params && {
                [params.key]: [params.value],
              },
            )
            .limit(limit || defaultSearchResultLimit)
            .exec();
          break;

        default:
          throw new BadGatewayException();
      }

      if (accounts.length < 1) {
        throw new NotFoundException(
          'Documents matches this parameters not found!',
        );
      }

      return accounts;
    } catch (error) {
      throw error;
    }
  }

  async grantRole({ id, role }: GrantRoleDTO) {
    const user = await this.findDocument(DataBaseOptions.userModel, {
      key: SearchParams._id,
      value: id,
    });

    if (role == Roles.Admin || user[0].role == Roles.Admin) {
      throw new ForbiddenException("You don't have enough rights!");
    }

    if (user[0].role == role) {
      throw new ConflictException('This user already has this role');
    }

    const response = await this.userModel.findByIdAndUpdate(id, {
      role,
    });

    if (!response) {
      throw new BadGatewayException('Cannot change user role');
    }

    return {
      message: `User(${id})  -  successfully changed role to ${role}`,
    };
  }

  async changeOrderStatus({ id, status }: ChangeOrderStatusDTO) {
    try {
      const order = await this.findDocument(DataBaseOptions.orderModel, {
        key: SearchParams._id,
        value: id,
      });

      if (order[0].status == status) {
        throw new ConflictException(
          `Order(${id}) already has this status(${status})`,
        );
      }

      let response = await this.orderModel.findByIdAndUpdate(id, {
        status: status,
      });

      if (!response) {
        throw new BadGatewayException('Cannot update order status');
      }

      return {
        message: `Order(${id}) status successfully updated from ${order[0].status} to ${status}`,
      };
    } catch (error) {
      throw error;
    }
  }

  private isValidObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    return true;
  }
}
