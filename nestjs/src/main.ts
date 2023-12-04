import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = `${process.env['NEST_PREFIX'] || 'backend'}`;
  app.setGlobalPrefix(prefix);
  const portNest =`${process.env['BACKEND_PORT_1'] || '3000' }`;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(portNest).then(() => {
    console.log(`🚀 Server ready at ${portNest} at url: http://localhost:${prefix}/...`);
  });
}

bootstrap();


