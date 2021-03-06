import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // NestExpressApplication指定当前应用基于express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 允许跨域
  app.enableCors()
  // 静态文件托管 -> 云存储之后不需要托管
  // app.useStaticAssets('uploads', {
  //   prefix: '/uploads'
  // })
  const options = new DocumentBuilder()
    .setTitle('Top full stack example')
    .setDescription('The top full stacj API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const PORT = process.env.ADMIN_PORT || 3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
