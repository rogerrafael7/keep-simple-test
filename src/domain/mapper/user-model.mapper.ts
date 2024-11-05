import { UserModel } from '@/domain/model/user.model';
import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';
import { SecurityUtil } from '@/infra/shared/utils/security.util';
import { GetUsersResponseDto } from '@/domain/usecase/user/dto/get-users.dto';
import { DateUtil } from '@/infra/shared/utils/date.util';

export class UserModelMapper {
  static toDomainGetUser(userModel: UserModel): GetUserResponseDto {
    return {
      id: userModel.id,
      taxId: SecurityUtil.obfuscate(userModel.taxId, 3, 2),
      name: userModel.name,
      birthDate: DateUtil.format(userModel.birthDate, 'YYYY-MM-DD'),
      street: userModel.street,
      number: userModel.number,
      complement: userModel.complement,
      neighborhood: userModel.neighborhood,
      city: userModel.city,
      state: userModel.state,
      zipCode: userModel.zipCode,
      recordStatus: userModel.recordStatus,
      removedAt: userModel.removedAt,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
    };
  }

  static toDomainGetUsers(response: GetUsersResponseDto): GetUsersResponseDto {
    return {
      ...response,
      data: response.data.map((userModel) => this.toDomainGetUser(userModel)),
    };
  }
}
