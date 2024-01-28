import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleEnum } from '../../enums/role.enum';

// Cria uma instância de `CanActivate` para ser usada como um mock de um guard de autenticação
export const authGuardMock: CanActivate = {
  // A função `canActivate` é um mock que vai ser chamada quando o guard de autenticação for ativado
  canActivate: jest.fn((context: ExecutionContext) => {
    // pega o objeto de requisição do contexto
    const request = context.switchToHttp().getRequest();

    // Simula a adição de um objeto de usuário ao objeto de requisição
    // Neste exemplo, o usuário tem um ID de 1 e na role ele é  adm
    request['user'] = { id: 3, role: RoleEnum.admin };

    // Retorna true para indicar que a autenticação foi bem-sucedida
    return true;
  }),
}
