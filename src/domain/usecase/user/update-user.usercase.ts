import { UserModel } from '@/domain/model/user.model';

export interface UpdateUserUseCaseDomain {
  execute(
    id: number,
    payload: Partial<UserModel>,
    updatedBy: number,
  ): Promise<void>;
}
