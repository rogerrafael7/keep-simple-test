import { Module } from '@nestjs/common';
import { AuthGuard } from '@/application/guard/auth.guard';
import { ControllerModule } from './application/module/controller.module';
import { DataModule } from '@/infra/data/data.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DataModule, ControllerModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
