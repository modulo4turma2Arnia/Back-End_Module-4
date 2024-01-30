import { UpdateProductMock } from './update-product.mock';
import { ListProductsMock } from './products-list.mock';

// nao esquercer
// A função Object.assign em JavaScript é 
// utilizada para copiar os valores de todas as
// propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto de destino.
export const UpdatedProductsMock = Object.assign(ListProductsMock[0], UpdateProductMock);