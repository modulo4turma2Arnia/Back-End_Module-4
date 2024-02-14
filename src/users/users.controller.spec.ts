import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth-guard';
import { ListUsersMock, UpdateUserMock, UpdatedUsersMock, authGuardMock } from '../testing/index';
import { UserServiceMock } from '../testing/index';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Info users', () => {
    it('should return information about the logged-in user', async () => {
      const result = await controller.InfoUser(ListUsersMock[0].id as never);

      expect(result).toEqual(ListUsersMock[0]);
    });
  });
    describe('Find All', () => {
      it('Should return all users', async () => {
        const result = await controller.findAll();

        expect(result).toEqual(ListUsersMock);
      });
    });

    describe('Find by Id', () => {
      it('Should return an user by id', async () => {
        const result = await controller.findOne('1');

        expect(result).toEqual(ListUsersMock[0]);
      });
    });

    describe('Update', () => {
      it('Should update an user', async () => {
        const result = await controller.update('1', UpdateUserMock);
  
        expect(result).toEqual(UpdatedUsersMock);
      });
    });

    describe('Remove', () => {
      it('Should remove an user', async () => {
        const result = await controller.remove('1');
  
        expect(result).toEqual({ result: `User with id ${ListUsersMock[0].id} has been deleted.` });
      });
    });


});
