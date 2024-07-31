import { bool, cleanEnv, num, port, str } from 'envalid';

const envalid = () => {
  cleanEnv(process.env, {
    PORT: port({ default: 3000 }),
    NODE_ENV: str({ choices: ['production', 'development'] }),
    CREDENTIALS: bool(),
    JWT_EXPIRE_TIME: num(),
    SALT: num({ default: 10 }),
  });
};

export default envalid;
