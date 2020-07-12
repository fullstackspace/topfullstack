import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors()
  // 静态文件托管 -> 云存储之后不需要托管
  // app.useStaticAssets('uploads', {
  //   prefix: '/uploads'
  // })
  const options = new DocumentBuilder()
    .setTitle('Top full stack web Api example')
    .setDescription('The top full stack API description')
    .setVersion('1.0')
    .addBearerAuth()  // addBearerAuth启用token功能
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const PORT = process.env.SERVER_PORT || 3005
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
