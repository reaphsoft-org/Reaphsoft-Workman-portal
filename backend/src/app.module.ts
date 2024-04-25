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
            secret: process.env.JWT_SECRET || '',
            signOptions: { expiresIn: '1d' }, // expire in 1 day see docs for details
        }),
    ],
    controllers: [AppController, AccountsController, AuthController],
    providers: [AppService, AccountsService, AuthService],
})
export class AppModule {}
