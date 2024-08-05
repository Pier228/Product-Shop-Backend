import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { Roles } from '../verifyRoles/roles';

export class CreateUserDTO {
  @ApiProperty({ example: 'Pier007', description: 'The login of the user' })
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'aksfas`jf12398124_1', description: 'The strong password of the user' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin', description: 'The role of the user', default: 'User' })
  @IsOptional() 
  @IsEnum(Roles)
  role?: Roles;
}
