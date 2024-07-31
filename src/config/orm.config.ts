import 'reflect-metadata';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '@config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  logging: true,
  logger: 'file',
};
