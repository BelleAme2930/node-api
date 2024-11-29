import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('To-Do API')
    .setDescription('This is the API for managing tasks.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Customize Swagger UI setup
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 0,
    },
  });

  await app.listen(3000);
}
bootstrap();
