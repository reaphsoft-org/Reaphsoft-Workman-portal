import {
    Body,
    Controller,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enum/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { WorkmenService } from '../workmen/workmen.service';
import { Request as RequestDecorator } from '@nestjs/common/decorators/http/route-params.decorator';
import { RatingDto } from '../workmen/dto/rating.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@UseGuards(RolesGuard)
@Roles(Role.Workman)
@UseGuards(AuthGuard)
@Controller('workman')
export class WorkmanController {
    constructor(private readonly service: WorkmenService) {}

    @Post('/service/rating/:id/:type/')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'beforePhoto', maxCount: 1 },
            { name: 'afterPhoto', maxCount: 1 },
        ]),
    )
    async addWorkmanRating(
        @RequestDecorator() req: Request,
        @Param('id') id: number,
        @Param('type') type: number,
        @Body() dto: RatingDto,
        @UploadedFiles()
        files: {
            beforePhoto?: Express.Multer.File[];
            afterPhoto?: Express.Multer.File[];
        },
    ) {
        if (Object.keys(dto).length === 0) {
            return { status: false, resp: 'Invalid request' };
        }
        if (dto.stars == undefined || dto.comment == undefined)
            return { status: false, resp: 'Invalid request, missing fields' };
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        if (!files)
            return { status: false, resp: 'Invalid request, missing photos' };
        const beforePhoto = files.beforePhoto ? files.beforePhoto[0] : null;
        const afterPhoto = files.afterPhoto ? files.afterPhoto[0] : null;
        if (!beforePhoto || !afterPhoto) {
            return { status: false, resp: 'Invalid request, missing photos' };
        }
        if (type < 1 || type > 2) {
            return { status: false, resp: 'Invalid request type' };
        }
        return this.service.addWorkmanRating(
            email,
            Number(type),
            Number(id),
            dto,
            beforePhoto,
            afterPhoto,
        );
    }
}
