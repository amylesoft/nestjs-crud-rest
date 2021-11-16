import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger doc
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //validation for api endpoints
  app.useGlobalPipes(new ValidationPipe());

  // enable access from all origin
  app.enableCors()

  await app.listen(process.env.PORT,()=>{
    console.log(`App is running on http://localhost:${process.env.PORT}/`)
    console.log(`Checkout docs at on http://localhost:${process.env.PORT}/api-docs`)
  });
}
bootstrap();
