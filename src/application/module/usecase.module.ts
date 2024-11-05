import { Module } from '@nestjs/common';
import {
  doLoginFactory,
  DoLoginUseCaseName,
} from '../usecase/auth/do.login.factory';
import {
  createUserFactory,
  CreateUserUseCaseName,
} from '@/application/usecase/user/factory/create-user.factory';
import {
  getUserFactory,
  GetUserUseCaseName,
} from '@/application/usecase/user/factory/get-user.factory';
import {
  getUserLogsFactory,
  GetUserLogsUseCaseName,
} from '@/application/usecase/user/factory/get-user-logs.factory';
import {
  getUsersFactory,
  GetUsersUseCaseName,
} from '@/application/usecase/user/factory/get-users.factory';
import {
  removeUserFactory,
  RemoveUserUseCaseName,
} from '@/application/usecase/user/factory/remove-user.factory';
import {
  updateUserFactory,
  UpdateUserUseCaseName,
} from '@/application/usecase/user/factory/update-user.factory';

@Module({
  providers: [
    doLoginFactory,
    createUserFactory,
    getUserFactory,
    getUsersFactory,
    getUserLogsFactory,
    removeUserFactory,
    updateUserFactory,
  ],
  exports: [
    DoLoginUseCaseName,
    CreateUserUseCaseName,
    GetUserUseCaseName,
    GetUsersUseCaseName,
    GetUserLogsUseCaseName,
    RemoveUserUseCaseName,
    UpdateUserUseCaseName,
  ],
})
export class UsecaseModule {}
