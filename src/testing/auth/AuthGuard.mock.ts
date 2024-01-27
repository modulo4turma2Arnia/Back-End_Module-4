import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleEnum } from '../../enums/role.enum';

// Cria uma instância de `CanActivate` para ser usada como um mock de um guard
export const authGuardMock: CanActivate = {
  // A função `canActivate` é uma simulação mock que será chamada quando o guard de autenticação for ativado
  canActivate: jest.fn((context: ExecutionContext) => {
    // pega o objeto de req do contexto
    const request = context.switchToHttp().getRequest();

    // Simula a adição de um objeto de usuário ao objeto de requisição
    request['user'] = { id: 2, role: RoleEnum.customer };

    // Retorna true para indicar que a autenticação foi bem-sucedida
    return true;  
  }),
}
