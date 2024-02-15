import { JwtService } from '@nestjs/jwt';
import { LoginReponseMock } from './login-response.mock';

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(LoginReponseMock),
  },
};
