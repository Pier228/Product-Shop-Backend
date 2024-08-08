import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/models/userSchema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './models/profileSchema';
import { Roles } from './verifyRoles/roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name, 'auth') private userModel: Model<User>,
    @InjectModel(Profile.name, 'profiles') private profileModel: Model<Profile>,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDTO) {
    try {
      let isExist = await this.findOne(user.login);

      if (isExist) {
        throw new ConflictException('User with this login is already exist!');
      }

      const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.HASH_LVL),
      );

      let isCreated = await this.userModel.create({
        ...user,
        password: hashedPassword,
      });

      if (!isCreated) {
        throw new BadGatewayException('User cannot created');
      }

      const token = await this.createAccessToken(isCreated._id, Roles.User);

      return { message: `Successfully registered`, token };
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginUserDTO) {
    try {
      const user = await this.findOne(data.login);

      if (!user) {
        throw new UnauthorizedException('User with this login is not found!');
      }

      const isEnter = bcrypt.compareSync(data.password, user.password);

      if (!isEnter) {
        throw new UnauthorizedException('Incorrect login or password');
      }

      const token = await this.createAccessToken(user._id, user.role);

      await this.isProfileCreated(user._id);

      return {
        message: `Successfully login!`,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  private async createAccessToken(id: string, role: Roles) {
    const token = await this.jwtService.signAsync({ id, role });

    if (!token) {
      throw new BadGatewayException('Cannot generate access token');
    }

    return token;
  }

  verifyToken(token: string) {
    try {
      let tokenData = this.jwtService.verify(token);
      return tokenData;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async findOne(login: string) {
    try {
      let isExist: null | User = await this.userModel.findOne({ login }).exec();
      return isExist;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async isProfileCreated(id: string) {
    try {
      let profile = await this.profileModel.findOne({ id });

      if (!profile) {
        await this.profileModel.create({ id });
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }
}
