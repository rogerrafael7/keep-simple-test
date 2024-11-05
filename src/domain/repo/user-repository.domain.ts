import { UserModel } from '../model/user.model';
import {
  GetUsersInputDto,
  GetUsersResponseDto,
} from '@/domain/usecase/user/dto/get-users.dto';
import { UserLogModel } from '@/domain/model/user-log.model';

export interface UserRepositoryDomain {
  findById(id: number): Promise<UserModel>;
  findManyPaginated(payload: GetUsersInputDto): Promise<GetUsersResponseDto>;
  findUserByTaxId(taxId: string): Promise<UserModel>;
  createUser(
    payload: Partial<UserModel>,
    createdBy: number,
  ): Promise<UserModel>;
  updateOneById(
    id: number,
    payload: Partial<UserModel>,
    updatedBy: number,
  ): Promise<void>;
  removeOneById(id: number, removedBy: number): Promise<void>;
  findLogsByUserId(userId: number): Promise<UserLogModel[]>;
}
