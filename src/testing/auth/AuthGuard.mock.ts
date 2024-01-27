import { CanActivate, ExecutionContext } from '@nestjs/common';

import { RoleEnum } from '../../enums/role.enum';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['user'] = { id: 2, role: RoleEnum.customer };

    return true;
  }),
};