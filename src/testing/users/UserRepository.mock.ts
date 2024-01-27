import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entities";
import { UsersListMock } from "./UsersList.mock";
import { CreateUserMock } from "./CreateUser.mock";
CreateUserMock

export const UserRepositoryMocks = {
    provide: getRepositoryToken(UserEntity),
    useValue: {
        exists: jest.fn().mockResolvedValue(false),
        create: jest.fn(() => UsersListMock[0]),
        save: jest.fn(),
        findOne: jest.fn(() => UsersListMock[0]),
    }
}
