import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Culture Power')
  //   .setDescription(
  //     'Project created for the last module of the course.',
  //   )
  //   .setVersion('0.1')
  //   .build();
  // const document = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('v1/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  // Verificar com professores se é obrigatório
  app.setGlobalPrefix('v1/');
  app.enableCors();
  await app.listen(+configService.get('APP_PORT') || 3000);
}
bootstrap();
