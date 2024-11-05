import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserModel } from '@/domain/model/user.model';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@/infra/data/entity/user.entity';
import { UserLogEntity } from '@/infra/data/entity/user-log.entity';
import { Logger } from '@nestjs/common';
import { UserLogModel } from '@/domain/model/user-log.model';
import {
  GetUsersInputDto,
  GetUsersResponseDto,
} from '@/domain/usecase/user/dto/get-users.dto';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';

export class UserRepo implements UserRepositoryDomain {
  private readonly repo: Repository<UserEntity>;
  private readonly userLogEntityRepo: Repository<UserLogEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(UserEntity);
    this.userLogEntityRepo = this.dataSource.getRepository(UserLogEntity);
  }
  async createUser(
    payload: Partial<UserModel>,
    createdBy: number,
  ): Promise<UserModel> {
    const user = await this.repo.save(this.repo.create(payload));
    this.#createLog(user.id, {
      createdBy,
    });
    return user;
  }

  findUserByTaxId(taxId: string): Promise<UserModel> {
    return this.repo.findOne({
      where: {
        taxId,
      },
    });
  }

  async removeOneById(id: number, removedBy: number): Promise<void> {
    const userSaved = await this.findById(id);
    await this.repo.update(userSaved.id, {
      removedAt: new Date(),
      recordStatus: 'removed',
    });
    this.#createLog(id, {
      removedBy,
    });
  }

  async findById(id: number): Promise<UserModel> {
    const user = await this.repo.findOne({
      where: {
        id,
        recordStatus: 'active',
      },
    });
    if (!user) {
      throw new ServerException(
        'User not found',
        SERVER_EXCEPTION_CODE.NOT_FOUND,
      );
    }
    return user;
  }

  findLogsByUserId(userId: number): Promise<UserLogModel[]> {
    return this.userLogEntityRepo.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findManyPaginated(
    payload: GetUsersInputDto,
  ): Promise<GetUsersResponseDto> {
    const { page, limit } = payload;
    const [data, totalItems] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async updateOneById(
    id: number,
    payload: Partial<UserModel>,
    updatedBy: number,
  ): Promise<void> {
    const userSaved = await this.findById(id);
    await this.repo.update(userSaved.id, {
      ...payload,
    });
    this.#createLog(id, {
      updatedBy,
    });
  }

  #createLog(userId: number, logPayload: Partial<UserLogModel>): void {
    const log = this.userLogEntityRepo.create({
      ...logPayload,
      userId,
    });
    this.userLogEntityRepo.save(log).catch((error) => {
      Logger.error('Error on save user log', UserRepo.name, error);
    });
  }
}
