import { UsersService } from '../../users/users.service';
import { RemovedUserMock } from './remove-user.mock';
import { UpdateUserMock } from './update-user.mock';
import { UpdatedUsersMock } from './updated-user.mock';
import { ListUsersMock } from './users-list.mock';

export const UserServiceMock = {
  provide: UsersService,
  useValue: {
    GetInfoUsers: jest.fn().mockResolvedValue(ListUsersMock[0]),
    FindAllUsers: jest.fn().mockResolvedValue(ListUsersMock),
    FindOne: jest.fn().mockResolvedValue(ListUsersMock[0]),
    RescueProduct: jest.fn(),
    changePassword: jest.fn(),
    UpdateUser: jest.fn().mockResolvedValue(UpdatedUsersMock),
    RemoveUser: jest.fn().mockResolvedValue({ result: `User with id ${ListUsersMock[0].id} has been deleted.` }),
  },
};