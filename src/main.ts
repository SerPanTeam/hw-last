import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Создаём конфигурацию для Swagger
  const config = new DocumentBuilder()
    .setTitle('The latest Node homework')
    .setDescription('API Documentation for The latest Node homework')
    .setVersion('1.0')
    // .addBearerAuth() // если будете подключать JWT
    .build();

  // Генерируем swagger-документ
  const document = SwaggerModule.createDocument(app, config);

  // Подключаем Swagger UI по пути /api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
