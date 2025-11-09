import { NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      prefix:'ClubHiring',
      colors: true,
      logLevels: ['error','warn']
    })
  });
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Allow-Headers',
    ], 
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
