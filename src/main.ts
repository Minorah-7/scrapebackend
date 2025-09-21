import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001; // 👈 use 3001
  await app.listen(port);
  console.log(`✅ Backend running on http://localhost:${port}`);
}
bootstrap();
