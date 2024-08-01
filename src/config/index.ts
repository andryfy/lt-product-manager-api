import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const SALT = Number(process.env.SALT);
export const JWT_EXPIRE_TIME = Number(process.env.JWT_EXPIRE_TIME);
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ORIGIN,
  METHODS,
  JWT_SECRET_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_PREFIX,
  TOKEN_HEADER_KEY,
  LOG_FORMAT,
  LOG_DIR,
} = process.env;
