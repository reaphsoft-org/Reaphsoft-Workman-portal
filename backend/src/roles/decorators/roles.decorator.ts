// 28/04/2024 13:19
// reaphsoft-workman
// github.com/kahlflekzy

import { Role } from '../enum/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
