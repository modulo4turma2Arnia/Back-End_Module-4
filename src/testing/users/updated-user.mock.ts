import { UpdateUserMock  } from './update-user.mock';
import { ListUsersMock } from './users-list.mock';

// nao esquercer
// Object.assign é 
// utilizado para copiar os valores de todas as
// propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto de destino.
export const UpdatedUsersMock = Object.assign(ListUsersMock[0], UpdateUserMock);