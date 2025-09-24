import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // allow all origins
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  // ✅ Bind to 0.0.0.0 for Railway
  await app.listen(port, '0.0.0.0');

  console.log(`✅ Backend running on port ${port}`);
}
bootstrap();
