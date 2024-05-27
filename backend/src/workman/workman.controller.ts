import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enum/role.enum';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Roles(Role.Workman)
@UseGuards(AuthGuard)
@Controller('workman')
export class WorkmanController {}
