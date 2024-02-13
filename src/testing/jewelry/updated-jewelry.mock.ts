import { UpdateJewelryMock } from './update-jewelry.mock';
import { ListJewelrysMock } from './list-jewelry.mock';

// nao esquercer
// Object.assign é 
// utilizado para copiar os valores de todas as
// propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto de destino.
export const UpdatedJewelryMock = Object.assign(ListJewelrysMock[0], UpdateJewelryMock);