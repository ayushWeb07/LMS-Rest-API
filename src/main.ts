import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiResponseFormatterInterceptor } from './common/interceptors/api-response-formatter/api-response-formatter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('LMS Rest API')
    .setDescription('The LMS Rest API description')
    .setVersion('1.0')
    .addTag('lms')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // enable cors on the nest app
  app.enableCors();

  // attach the api response formatter interceptor
  app.useGlobalInterceptors(new ApiResponseFormatterInterceptor());

  // serve the nest app
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
