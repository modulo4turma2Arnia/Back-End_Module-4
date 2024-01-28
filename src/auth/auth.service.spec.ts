import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  CreateUserMock,
  JwtServiceMock,
  LoginMock,
  LoginReponseMock,
  ListUsersMock,
  UserRepositoryMock,
  GetFilesMock,
} from '../testing';
import { HttpException } from '@nestjs/common';



describe('Auth Service', () => {
  let Auth_Service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserRepositoryMock, JwtServiceMock],
    }).compile();

    Auth_Service = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(Auth_Service).toBeDefined();
  });

  describe('Create', () => {
    it('Should register a new user.', async () => {
        const Photo = await GetFilesMock();
   

      const NewUser = await Auth_Service.RegisterAuthService(CreateUserMock, Photo);
  
      expect(NewUser).toEqual(ListUsersMock[0]);
    });
  });


  it('Should not allow creating a user with the same email', async () => {
    const Photo = await GetFilesMock();

    // Utilizando o UserRepositoryMock que já tem um usuário mockado como existente
    jest.spyOn(UserRepositoryMock.useValue, 'exists').mockResolvedValue(true);
  
    // Verifique se a função lançou uma exceção do tipo HttpException com a mensagem esperada
    await expect(async () => {
      await Auth_Service.RegisterAuthService(CreateUserMock, Photo);
    }).rejects.toThrow(HttpException);
  });



})