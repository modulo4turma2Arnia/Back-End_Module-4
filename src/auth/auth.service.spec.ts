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
import {
  HttpException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

      const NewUser = await Auth_Service.RegisterAuthService(
        CreateUserMock,
        Photo,
      );

      expect(NewUser).toEqual(ListUsersMock[0]);
    });

    it('Should not allow creating a user with the same email', async () => {
      const Photo = await GetFilesMock();

      jest.spyOn(UserRepositoryMock.useValue, 'exists').mockResolvedValue(true);

      const result = Auth_Service.RegisterAuthService(CreateUserMock, Photo);

      await expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Auth login', () => {
    it('Should return a token if email and password are correct', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const LoginAuth = await Auth_Service.LoginAuthService(LoginMock);

      expect(LoginAuth).toEqual({ token: LoginReponseMock });
    });

    it('should return an exception when the user is not found', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null);

      const loginAuth = Auth_Service.LoginAuthService(LoginMock);

      await expect(loginAuth).rejects.toThrow(HttpException);
    });

    it('should return an exception when the user is not found', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      const loginAuth = Auth_Service.LoginAuthService(LoginMock);

      await expect(loginAuth).rejects.toThrow(HttpException);
    });
  });
});
