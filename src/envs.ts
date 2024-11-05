import { config } from 'dotenv';

config();

export type Envs = {
  MYSQL_DATABASE_HOST: string;
  MYSQL_DATABASE_PORT: string;
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  JWT_SECRET: string;
};

export const envs = new Proxy<Envs>({} as Envs, {
  get(target, prop: string) {
    return process.env[prop];
  },
});
