import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from './data-source';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.useStaticAssets('media');

    AppDataSource.initialize()
        .then(() => {
            // here you can start to work with your database
        })
        .catch((error) => console.log(error));
    await app.listen(3001);
}
bootstrap();
