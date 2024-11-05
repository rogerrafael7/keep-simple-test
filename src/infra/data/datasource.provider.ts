import { DataSource } from 'typeorm';
import { envs } from '@/envs';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      ssl: false,
      multipleStatements: true,
      host: envs.MYSQL_DATABASE_HOST,
      port: +envs.MYSQL_DATABASE_PORT,
      username: envs.MYSQL_USER,
      password: envs.MYSQL_PASSWORD,
      database: envs.MYSQL_DATABASE,
      entities: [__dirname + '/entity/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
    });

    return dataSource.initialize();
  },
};
