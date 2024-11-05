import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserUseCaseDomain } from '@/domain/usecase/user/create-user.usercase';
import { CreateUserUseCaseName } from '@/application/usecase/user/factory/create-user.factory';
import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';
import { RequestApplication } from '@/infra/shared/types/request-application.type';
import { GetUserUseCaseName } from '@/application/usecase/user/factory/get-user.factory';
import { GetUserUseCaseDomain } from '@/domain/usecase/user/get-user.usercase';
import { GetUsersUseCaseDomain } from '@/domain/usecase/user/get-users.usercase';
import { GetUsersUseCaseName } from '@/application/usecase/user/factory/get-users.factory';
import { GetUserLogsUseCaseName } from '@/application/usecase/user/factory/get-user-logs.factory';
import { GetUserLogsUseCaseDomain } from '@/domain/usecase/user/get-user-logs.usercase';
import { RemoveUserUseCaseDomain } from '@/domain/usecase/user/remove-user.usercase';
import { RemoveUserUseCaseName } from '@/application/usecase/user/factory/remove-user.factory';
import { UpdateUserUseCaseName } from '@/application/usecase/user/factory/update-user.factory';
import { UpdateUserUseCaseDomain } from '@/domain/usecase/user/update-user.usercase';
import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';
import {
  GetUsersInputDto,
  GetUsersResponseDto,
} from '@/domain/usecase/user/dto/get-users.dto';
import { GetUserLogsResponseDto } from '@/domain/usecase/user/dto/get-user-logs.dto';
import { UpdateUserInputDto } from '@/domain/usecase/user/dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCaseName)
    private readonly createUserUseCase: CreateUserUseCaseDomain,
    @Inject(GetUserUseCaseName)
    private readonly getUserUseCaseDomain: GetUserUseCaseDomain,
    @Inject(GetUsersUseCaseName)
    private readonly getUsersUseCase: GetUsersUseCaseDomain,
    @Inject(GetUserLogsUseCaseName)
    private readonly getUserLogsUseCase: GetUserLogsUseCaseDomain,
    @Inject(RemoveUserUseCaseName)
    private readonly removeUserUseCase: RemoveUserUseCaseDomain,
    @Inject(UpdateUserUseCaseName)
    private readonly updateUserUseCase: UpdateUserUseCaseDomain,
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @Post()
  async createUser(
    @Body() payload: CreateUserInputDto,
    @Req() request: RequestApplication,
  ): Promise<CreateUserResponseDto> {
    return await this.createUserUseCase.execute(payload, request.user.id);
  }

  @ApiOperation({ summary: 'Get Users Paginated' })
  @ApiResponse({
    status: 200,
    description: 'Users returned successfully',
    type: GetUsersResponseDto,
  })
  @Get()
  getUsers(@Query() payload: GetUsersInputDto): Promise<GetUsersResponseDto> {
    return this.getUsersUseCase.execute(payload);
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({
    status: 200,
    description: 'User returned successfully',
    type: GetUserResponseDto,
  })
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<GetUserResponseDto> {
    return this.getUserUseCaseDomain.execute(id);
  }

  @ApiOperation({ summary: 'Get User Logs' })
  @ApiResponse({
    status: 200,
    description: 'User returned successfully',
    type: GetUserLogsResponseDto,
  })
  @Get(':userId/logs')
  getUserLogs(
    @Param('userId') userId: number,
  ): Promise<GetUserLogsResponseDto[]> {
    return this.getUserLogsUseCase.execute(userId);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 204,
    description: 'User updated successfully',
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserInputDto,
    @Req() request: RequestApplication,
  ): Promise<void> {
    await this.updateUserUseCase.execute(id, updateUserDto, request.user.id);
  }

  @ApiOperation({ summary: 'Remove User' })
  @ApiResponse({
    status: 204,
    description: 'User removed successfully',
  })
  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Req() request: RequestApplication,
  ): Promise<void> {
    await this.removeUserUseCase.execute(id, request.user.id);
  }
}
