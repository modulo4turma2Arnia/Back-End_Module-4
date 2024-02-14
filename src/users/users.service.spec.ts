import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  ListJewelrysMock,
  ListProductsMock,
  ListUsersMock,
  UpdatedUsersMock,
  ProductsRepositoryMock,
  UpdateUserMock,
  UserRepositoryMock,
} from '../testing/index';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'



describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepositoryMock, ProductsRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('Return all users', async () => {
      const result = await service.FindAllUsers();

      expect(result).toEqual(ListUsersMock);
    });

    it('Return an error if are not users registered', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'find')
        .mockResolvedValue([] as never);
      const result = service.FindAllUsers();

      expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Find users by id', () => {
    it('Should be return a user when id as sent to function', async () => {
      const result = await service.FindOne(ListUsersMock[0].id);

      expect(result).toEqual(ListUsersMock[0]);
    });

    it('Return an error when not found user with id ', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null as never);

      const result = service.FindOne(ListUsersMock[0].id);

      expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Get info users', () => {
    it('Should be possible return info of user id', async () => {
      const UserWithInfo = {
        ...ListUsersMock[0],
        jewelries: [{ type: ListJewelrysMock[0].type }],
        products: [{ type: ListProductsMock[0] }],
      };
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(UserWithInfo as never);

      const result = await service.GetInfoUsers(ListUsersMock[0].id);

      expect(result).toEqual(UserWithInfo);
    });

    it('Return an erro when user not found', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null as never);

      const result = service.GetInfoUsers(ListUsersMock[0].id);

      expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Update Users', () => {
    it('Should be possible update a user', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(ListUsersMock[0] as never);

      const result = await service.UpdateUser(
        ListUsersMock[0].id,
        UpdateUserMock,
      );

      expect(result).toEqual(UpdatedUsersMock);
    });
    it('Return an erro when user is not found', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null as never);

      const result = service.UpdateUser(ListUsersMock[0].id, UpdateUserMock);

      expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Remove user ', () => {
    it('Should be possible remove a user from database', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(ListUsersMock[0].id as never);

      const result = await service.RemoveUser(ListUsersMock[0].id);

      expect(result).toEqual({
        result: `User with id ${ListUsersMock[0].id} has been deleted.`,
      });
    });

    it('should return an error when the user is not found', async () => {
      jest
        .spyOn(UserRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null as never);

      const result = service.RemoveUser(ListUsersMock[0].id);

      expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('Rescue product', () => {
    it('it should be possible to redeem a product', async () => {
      const UserWithInfo = {
        ...ListUsersMock[0],
        credits: 1000,
        products: [{ type: ListProductsMock[0] }],
      };
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(UserWithInfo as never);

      const result = await service.RescueProduct( ListProductsMock[0].id ,ListUsersMock[0].id)

      expect(result).toEqual(UserWithInfo);
    })

    it("Should return a message when the user doesn't have enough credits", async () => {
      const UserWithInfo = {
        ...ListUsersMock[0],
        credits: 0,
       };
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(UserWithInfo as never);

      const result = service.RescueProduct(ListProductsMock[0].id ,ListUsersMock[0].id)

      expect(result).rejects.toThrow(HttpException);
    })

    it("Should return an error when it can't find the user or product", async () => {
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(null as never);

      const result = service.RescueProduct(ListProductsMock[0].id ,ListUsersMock[0].id)

      expect(result).rejects.toThrow(HttpException);
    })


  })

  describe("Change Password", () => {
    it("should be possible to change the user's password if the password meets the requirements.", async () => {
  
      const NewPassWord = {
        newPassword: 'senha1234',
        currentPassword: 'senhaantiga',
        id: ListUsersMock[0].id
      }
  
      const mockedUser = { id: ListUsersMock[0].id, password: 'senhaantiga' };
  
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(mockedUser as never);
      jest.spyOn(bcrypt, 'compare').mockImplementation((password: string, hashedPassword: string) => {
        if (password === 'senhaantiga' && hashedPassword === mockedUser.password) {
          return true;
        } else {
          return false;
        }
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedNewPassword' as never);
  
      const result = await service.changePassword(ListUsersMock[0].id, NewPassWord);
  
      expect(result).toEqual({ Result: 'User Password changed succefully' });
    });
  });
  
});
