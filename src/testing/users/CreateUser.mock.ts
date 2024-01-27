import { RoleEnum } from '../../enums/role.enum';
import { UserRegisterDto } from 'src/auth/dto/register.dto';


export const CreateUserMock: UserRegisterDto = {
  FirstName: 'Gabriel',
  LastName: 'Anacleto',
  email: 'ga@anacleto.com.br',
  password: 'senha123',
  role: RoleEnum.admin,

}
