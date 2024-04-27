import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { WorkmenService } from './workmen.service';
import { ServiceRequestDto } from './dto/service-request.dto';
import { Request as RequestDecorator } from '@nestjs/common/decorators/http/route-params.decorator';

@UseGuards(AuthGuard)
@Controller('workmen/')
export class WorkmenController {
    constructor(private readonly service: WorkmenService) {}

    @Get('services/')
    getServices() {
        return this.service.getServices();
    }

    @Get('services/workers/')
    // get workers who perform a specified service
    getWorkersForService(@Query('id') id: number, @Query('name') name: string) {
        if (id == undefined || name == undefined)
            return { status: false, resp: 'invalid request', data: [] };
        return this.service.getWorkersForService(id, name);
    }

    // CRUD for service request
    @Post('request/service/')
    // worker name, worker id, required date time,
    createServiceRequest(
        @RequestDecorator() req: Request,
        @Body() dto: ServiceRequestDto,
    ) {
        if (Object.keys(dto).length === 0) {
            return { status: false, resp: 'invalid request' };
        }
        if (
            dto.workerID == undefined ||
            dto.workerName == undefined ||
            dto.date == undefined
        )
            return { status: false, resp: 'invalid request, missing fields' };
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        return this.service.createServiceRequest(email, type, dto);
    }
    // skip update and delete for now
    @Get('request/service/:id/')
    getServiceRequest(
        @RequestDecorator() req: Request,
        @Param('id') id: number,
    ) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        return this.service.getServiceRequest(id, email, type);
    }

    @Get('requested/services/')
    getRequestedServices(@RequestDecorator() req: Request) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        return this.service.getRequestedServices(email, type);
    }
}
