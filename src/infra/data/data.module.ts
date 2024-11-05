import { Global, Module } from '@nestjs/common';
import { databaseProvider } from '@/infra/data/datasource.provider';
import { UserRepo } from '@/infra/data/repo/user.repo';

@Global()
@Module({
  providers: [
    databaseProvider,
    {
      provide: UserRepo.name,
      inject: [databaseProvider.provide],
      useFactory: (dataSource) => new UserRepo(dataSource),
    },
  ],
  exports: [UserRepo.name],
})
export class DataModule {}
