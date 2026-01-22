import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.getHttpAdapter().getInstance().disable('x-powered-by');




  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Telepoke API')
      .setDescription('Backend API documentation for Telepoke messaging application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);



    writeFileSync(
      join(process.cwd(), 'swagger.json'),
      JSON.stringify(document, null, 2),
    );
  }




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
