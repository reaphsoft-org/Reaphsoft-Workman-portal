import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from './data-source';
import { FRONTEND_DOMAIN, HOST_IP } from './utilities/konstants';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: `${FRONTEND_DOMAIN}`,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.useStaticAssets('media');

    AppDataSource.initialize()
        .then(() => {
            // here you can start to work with your database
        })
        .catch((error) => console.log(error));
    await app.listen(3001, HOST_IP);
}
bootstrap().then(() => {});
