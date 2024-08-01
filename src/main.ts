import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger, stream } from '@utils/logger';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {
  CREDENTIALS,
  LOG_FORMAT,
  METHODS,
  NODE_ENV,
  ORIGIN,
  PORT,
} from '@config';
import { ValidationPipe } from '@nestjs/common';
import envalid from './utils/envalid';

async function bootstrap() {
  envalid();
  const app = await NestFactory.create(AppModule);
  const env = NODE_ENV || 'development';
  const port = PORT || 3000;

  app.use(morgan(LOG_FORMAT, { stream }));
  app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS, methods: METHODS }));
  app.use(hpp());
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api/v1'); // Adds prefix
  await app.listen(3000, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${env} =======`);
    logger.info(`🚀 App listening on the port ${port}`);
    logger.info(`=================================`);
  });
}
bootstrap();
