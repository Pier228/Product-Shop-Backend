import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly registrationService: AuthService) {}

  @Post('reg')
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({
    description: 'User successfully registered.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. Validation failed.',
  })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Data for new user registration',
  })
  async register(@Body() user: CreateUserDTO) {
    return this.registrationService.register(user);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log in user account, also generates JWT token' })
  @ApiOkResponse({
    description: 'User successfully logged in. Returns JWT token.',
    schema: {
      example: {
        message: 'Successfully login',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid credentials.',
  })
  @ApiBody({ type: LoginUserDTO, description: 'User credentials for login' })
  async login(@Body() data: LoginUserDTO) {
    return this.registrationService.login(data);
  }
}
