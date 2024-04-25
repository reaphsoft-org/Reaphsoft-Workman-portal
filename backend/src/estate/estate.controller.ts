import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request as RequestDecorator } from '@nestjs/common/decorators/http/route-params.decorator';
import { EstateManager } from '../entities/EstateManager';
import { EstateService } from './estate.service';
import { HouseDto } from './dto/house.dto';

@Controller('estate/')
export class EstateController {
    constructor(private readonly estateService: EstateService) {}

    @UseGuards(AuthGuard)
    @Post('add/house/')
    async addHouse(@RequestDecorator() req: Request, @Body() dto: HouseDto) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            return { status: false, resp: 'invalid request' };
        return this.estateService.addHouse(email, dto);
    }

    @UseGuards(AuthGuard)
    @Put('add/house/:id/')
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
            return { status: false, resp: 'invalid request' };
        return this.estateService.updateHouse(email, id, dto);
    }

    @UseGuards(AuthGuard)
    @Get('add/house/:id/')
    async getHouse(@RequestDecorator() req: Request, @Param('id') id: string) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        if (type != EstateManager.accountType)
            return { status: false, resp: 'invalid request' };
        return this.estateService.getHouse(email, id);
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
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
            return { status: false, resp: 'invalid request' };
        return this.estateService.getHouses(email, page);
    }
}
