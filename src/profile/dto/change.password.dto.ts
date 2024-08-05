import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'current_Password123!',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'The new strong password for the user',
    example: 'New_Strong_Password!234',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}
