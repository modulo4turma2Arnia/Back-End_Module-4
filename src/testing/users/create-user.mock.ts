import { RoleEnum } from '../../enums/role.enum';
import { UserRegisterDto } from 'src/auth/dto/register.dto';

export const CreateUserMock: UserRegisterDto = {
  FirstName: 'Gabriel testes',
  LastName: 'anacleto',
  email: 'ga@ga.com.it',
  password: 'senha123',
  role: RoleEnum.admin,
};
