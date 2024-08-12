import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from 'src/auth/verifyRoles/roles';

export class GrantRoleDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
