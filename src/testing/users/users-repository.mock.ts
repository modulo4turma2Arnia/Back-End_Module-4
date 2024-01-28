import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import { ListUsersMock } from "./users-list.mock";
//import { listmock }

export const UserRepositoryMock = {
    provide: getRepositoryToken(UserEntity),
    useValue: {
        exists: jest.fn(),
        create: jest.fn().mockReturnValue(ListUsersMock[0]),
        save: jest.fn(),
        findOne: jest.fn().mockResolvedValue(ListUsersMock[0]),
    }
}