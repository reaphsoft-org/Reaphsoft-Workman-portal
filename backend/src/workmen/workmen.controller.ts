import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { WorkmenService } from './workmen.service';

@UseGuards(AuthGuard)
@Controller('workmen/')
export class WorkmenController {
    constructor(private readonly service: WorkmenService) {}

    @Get('services/')
    getServices() {
        return this.service.getServices();
    }
}
