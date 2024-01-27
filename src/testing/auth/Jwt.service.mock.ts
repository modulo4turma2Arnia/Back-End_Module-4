import { JwtService } from "@nestjs/jwt";
import { LoginResponseMocks } from "./LoginResponse.mock";


// mock da service do json web token
export const JWTServiceMock = {
    provide: JwtService,
    useValue: {
        signAsync: jest.fn().mockResolvedValue(LoginResponseMocks.token)
    }
}