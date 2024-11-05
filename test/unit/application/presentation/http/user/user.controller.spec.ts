import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserController } from '@/application/presentation/http/user/user.controller';
import { createUserUseCaseDomainStub } from '../../../../__stubs__/createUserUseCaseDomain.stub';
import { getUserUseCaseDomainStub } from '../../../../__stubs__/getUserUseCaseDomain.stub';
import { getUsersUseCaseDomainStub } from '../../../../__stubs__/getUsersUseCaseDomain.stub';
import { getUserLogsUseCaseDomainStub } from '../../../../__stubs__/getUserLogsUseCaseDomain.stub';
import { removeUserUseCaseDomainStub } from '../../../../__stubs__/removeUserUseCaseDomain.stub';
import { updateUserUseCaseDomainStub } from '../../../../__stubs__/updateUserUseCaseDomain.stub';
import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    userController = new UserController(
      createUserUseCaseDomainStub,
      getUserUseCaseDomainStub,
      getUsersUseCaseDomainStub,
      getUserLogsUseCaseDomainStub,
      removeUserUseCaseDomainStub,
      updateUserUseCaseDomainStub,
    );
  });

  describe('createUser', () => {
    it('should create an user successfully', async () => {
      const input: CreateUserInputDto = {
        taxId: '79198989430',
        name: 'Robert Olson',
        birthDate: '1998-09-26',
        password: '79198989430',
        street: 'Yost Square',
        number: '965',
        complement: 'Terry, Crist and Lind',
        neighborhood: 'Handcrafted Concrete Mouse',
        city: 'Lilaview',
        zipCode: '71015-001',
      };
      const output: CreateUserResponseDto = {
        id: 2,
      };

      jest
        .spyOn(createUserUseCaseDomainStub, 'execute')
        .mockResolvedValue(output);
      expect(
        await userController.createUser(input, {
          user: {
            id: 1,
          },
        }),
      ).toBe(output);
    });

    it.each([
      { input: {}, countExpectedErrors: 3 },
      {
        input: {
          taxId: '',
          name: 'Robert Olson',
          birthDate: '1998-09-26',
          password: '79198989430',
          street: 'Yost Square',
          number: '965',
          complement: 'Terry, Crist and Lind',
          neighborhood: 'Handcrafted Concrete Mouse',
          city: 'Lilaview',
          zipCode: '71015-001',
        },
        countExpectedErrors: 1,
      },
      {
        input: {
          taxId: '79198989430',
          name: 'Robert Olson',
          birthDate: '1998-09-26',
          password: '',
          street: 'Yost Square',
          number: '965',
          complement: 'Terry, Crist and Lind',
          neighborhood: 'Handcrafted Concrete Mouse',
          city: 'Lilaview',
          zipCode: '71015-001',
        },
        countExpectedErrors: 1,
      },
    ])(
      'should throw error if payload is invalid',
      async ({ input, countExpectedErrors }) => {
        const dto = plainToInstance(CreateUserInputDto, input);
        const errors = await validate(dto);
        expect(errors).toHaveLength(countExpectedErrors);
      },
    );
  });
});
