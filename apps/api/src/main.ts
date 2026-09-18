import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Disable framework signatures
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Satcom Engineers API')
    .setDescription('منصة العمل الحر لهندسة وعلوم الاتصالات والتقنية - توثيق واجهات برمجة التطبيقات')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Satcom Engineers API Server running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger Documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();