import { UsersService } from '../../users/users.service';
import { RemovedUserMock } from './remove-user.mock';
import { UpdateUserMock } from './update-user.mock';
import { ListUsersMock } from './users-list.mock';

export const UserServiceMock = {
  provide: UsersService,
  useValue: {
    findAll: jest.fn().mockResolvedValue(ListUsersMock),
    findOne: jest.fn().mockResolvedValue(ListUsersMock[0]),
    update: jest.fn().mockResolvedValue(UpdateUserMock),
    remove: jest.fn().mockResolvedValue(RemovedUserMock),
  },
};