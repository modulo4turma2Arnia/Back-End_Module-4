import { UsersService } from "src/users/users.service";



export const JewelServiceMocks = {
    provide: UsersService,
    useValue: {
        RegisterAuthService: jest.fn(),
        LoginAuthService: jest.fn(),
    }
}