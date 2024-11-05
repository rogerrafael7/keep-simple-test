import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from '../../../decorator/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoLoginUseCaseDomain } from '@/domain/usecase/auth/do-login.usecase';
import { DoLoginUseCaseName } from '@/application/usecase/auth/do.login.factory';
import {
  DoLoginResponseDto,
  DoLoginInputDto,
} from '@/domain/usecase/auth/dto/do-login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(DoLoginUseCaseName)
    private readonly doLoginUseCase: DoLoginUseCaseDomain,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Endpoint to Login' })
  @ApiResponse({
    status: 200,
    description: 'Return auth data',
    type: DoLoginResponseDto,
  })
  async login(@Body() input: DoLoginInputDto): Promise<DoLoginResponseDto> {
    return this.doLoginUseCase.execute(input);
  }
}
