import { Module } from '@nestjs/common';
import { AuthController } from '../presentation/http/auth/auth.controller';
import { UserController } from '../presentation/http/user/user.controller';
import { UsecaseModule } from './usecase.module';

@Module({
  imports: [UsecaseModule],
  controllers: [AuthController, UserController],
})
export class ControllerModule {}
