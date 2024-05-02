import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as RequestDecorator } from '@nestjs/common/decorators/http/route-params.decorator';
import { EstateManager } from '../entities/EstateManager';
import { EstateService } from './estate.service';
import { HouseDto } from './dto/house.dto';

@UseGuards(AuthGuard)
@Controller('estate/')
export class EstateController {
    constructor(private readonly estateService: EstateService) {}

    @Post('add/house/')
    async addHouse(@RequestDecorator() req: Request, @Body() dto: HouseDto) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            throw new UnauthorizedException('Estate account required');
        return this.estateService.addHouse(email, dto);
    }

    @Put('house/:id/')
    async updateHouse(
        @RequestDecorator() req: Request,
        @Param('id') id: string,
        @Body() dto: HouseDto,
    ) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            throw new UnauthorizedException('Estate account required');
        return this.estateService.updateHouse(email, id, dto);
    }

    @Get('house/:id/')
    async getHouse(@RequestDecorator() req: Request, @Param('id') id: string) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            throw new UnauthorizedException('Estate account required');
        return this.estateService.getHouse(email, id);
    }

    @Delete('add/house/:id/')
    async deleteHouse(
        @RequestDecorator() req: Request,
        @Param('id') id: string,
    ) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            return { status: false, resp: 'invalid request' };
        return this.estateService.deleteHouse(email, id);
    }

    @Get('houses/:page/')
    async getHouses(
        @RequestDecorator() req: Request,
        @Param('page') page: number,
    ) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            throw new UnauthorizedException('estate account required');
        return this.estateService.getHouses(email, page);
    }
}
