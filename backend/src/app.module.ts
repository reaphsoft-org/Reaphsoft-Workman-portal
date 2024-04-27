import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as fs from 'fs';
import { JwtModule } from '@nestjs/jwt';
import { EstateController } from './estate/estate.controller';
import { EstateService } from './estate/estate.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

export const MEDIA_DIR = path.join(__dirname, '..', 'media/u');
export const ASSETS_DIR = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
}
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: MEDIA_DIR,
            serveRoot: '/media/u/',
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '3h' }, // expire in 1 day see docs for details, e.g '3h', '1d', 60 for seconds
        }),
    ],
    controllers: [
        AppController,
        AccountsController,
        AuthController,
        EstateController,
        AdminController,
    ],
    providers: [
        AppService,
        AccountsService,
        AuthService,
        EstateService,
        AdminService,
    ],
})
export class AppModule {}
