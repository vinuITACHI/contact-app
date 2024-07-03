import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enable CORS
  const config = new DocumentBuilder()
    .setTitle('Contact API')
    .setDescription('The contact API description')
    .setVersion('1.0')
    .addTag('contact')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4000); // Changed port to 4000
}
bootstrap();