import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/auth/verifyRoles/roles';

export class GrantRoleDTO {
  @ApiProperty({
    description: 'The ID of the user to whom the role will be granted.',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The role to be granted to the user.',
    enum: Roles,
    example: Roles.Moderator,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
