import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/models/userSchema';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDTO } from './dto/change.password.dto';
import { Profile } from 'src/auth/models/profileSchema';
import { AddProductToCartDTO } from './dto/add.product.to.cart.dto';
import { RemoveFromCartDTO } from './dto/remove.product.from.cart.dto';
import { getDataOptions } from './dto/get.data.options';

@Injectable()
export class ProfileService {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name, 'auth') private userModel: Model<User>,
    @InjectModel(Profile.name, 'profiles') private profileModel: Model<Profile>,
  ) {}

  async getProfile(token: string) {
    try {
      let user = await this.findUser(token);
      let profile = await this.findProfile(token);
      let { login, email, role } = user;
      return {
        login,
        email,
        role,
        cart: profile.cart,
        history: profile.orderHistory,
      };
    } catch (error) {
      throw error;
    }
  }

  async getData(token: string, dataOption: getDataOptions) {
    try {
      let profile = await this.findProfile(token);
      return profile[dataOption];
    } catch (error) {
      throw error;
    }
  }

  async addProduct(token: string, product: AddProductToCartDTO) {
    try {
      let user = await this.findUser(token);
      let response = await this.profileModel.findOneAndUpdate(
        {
          id: user._id,
        },
        { $push: { cart: product } },
      );

      if (!response) {
        throw new BadGatewayException('Cannot add product to cart!');
      }
      return { message: 'Product successfully added' };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(token: string, data: ChangePasswordDTO) {
    try {
      let user = await this.findUser(token);
      let comparePassword = await bcrypt.compare(
        data.oldPassword,
        user.password,
      );

      if (!comparePassword) {
        throw new UnauthorizedException('Wrong password');
      }

      let hashedPassword = await bcrypt.hash(
        data.newPassword,
        Number(process.env.HASH_LVL),
      );

      let response = await this.userModel.findByIdAndUpdate(user._id, {
        password: hashedPassword,
      });

      if (!response) {
        throw new NotFoundException('Cannot find profile');
      }

      return { message: 'Password was successfully changed' };
    } catch (error) {
      throw error;
    }
  }

  async deleteFromCart(token: string, { productId }: RemoveFromCartDTO) {
    try {
      let profile = await this.findProfile(token);
      let cart = profile.cart;

      const index = cart.findIndex((item) => item._id === productId);

      if (index === -1) {
        throw new NotFoundException(
          `Product with id ${productId} not found in cart.`,
        );
      }

      cart.splice(index, 1);

      let response = await this.profileModel.findOneAndUpdate(
        { id: profile.id },
        { cart },
      );

      if (!response) {
        throw new NotFoundException('Cannot remove product from cart!');
      }
      return {
        message: `Product with id - ${productId} was successfully removed from the cart`,
      };
    } catch (error) {
      throw error;
    }
  }

  private async findProfile(token: string) {
    try {
      let user = await this.findUser(token);
      let profile = await this.profileModel.findOne({ id: user._id });

      if (!profile) {
        throw new NotFoundException("Profile doesn't found!");
      }

      return profile;
    } catch (error) {
      throw error;
    }
  }

  private async findUser(token: string) {
    try {
      let response = this.authService.verifyToken(token);
      let user = await this.userModel.findById(response.id);
      if (!user) throw new NotFoundException("User doesn't found!");
      return user;
    } catch (error) {
      throw error;
    }
  }
}
