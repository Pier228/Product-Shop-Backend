import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({ example: 'Pier007', description: 'The login of the user' })
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'aksfas`jf12398124_1', description: 'The strong password of the user' })
  @IsNotEmpty()
  password: string;
}
