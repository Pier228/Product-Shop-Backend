import { Reflector } from '@nestjs/core';
import { Roles } from './roles';

export const Role = Reflector.createDecorator<Roles[]>();