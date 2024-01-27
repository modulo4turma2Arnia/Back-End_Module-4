import { SetMetadata } from '@nestjs/common';
// role.decorator.ts
import { RoleEnum } from '../../enums/role.enum';


// lembrar que preciso do setmetadata pra usar o reflector e guards
//pode ser usado para recuperar esses metadados associados a uma rota e tomar decisões de autorização com base neles.
// define informações adicionais associadas a elementos específicos da aplicação, 
// que podem ser consultadas mais tarde para tomar decisões lógicas, como autorização de acesso a uma rota.
// Esta é a chave especial que identifica os papéis associados a uma rota.
export const ROLES_KEY = 'roles';

// decorator personalizado
// recebe lista de funções ou permissões e  associa à rota.
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
