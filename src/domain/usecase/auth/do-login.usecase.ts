import { DoLoginResponseDto, DoLoginInputDto } from './dto/do-login.dto';

export interface DoLoginUseCaseDomain {
  execute(payload: DoLoginInputDto): Promise<DoLoginResponseDto>;
}
