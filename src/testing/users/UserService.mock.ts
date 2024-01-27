import { UsersService } from "src/users/users.service";
import { UsersListMock } from "./UsersList.mock";



export const UserServiceMocks = {
    provide: UsersService,
    useValue: {
        RegisterAuthService: jest.fn(),
        LoginAuthService: jest.fn(),
    }
}