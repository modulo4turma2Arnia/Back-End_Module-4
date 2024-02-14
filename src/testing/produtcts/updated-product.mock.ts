import { UpdateProductMock } from './update-product.mock';
import { ListProductsMock } from './products-list.mock';

// nao esquercer
<<<<<<< HEAD
// A função Object.assign em JavaScript é
// utilizada para copiar os valores de todas as
=======
// Object.assign é 
// utilizado para copiar os valores de todas as
>>>>>>> 313855266f1282ecb048b8aca9b4971966b5a346
// propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto de destino.
export const UpdatedProductsMock = Object.assign(
  ListProductsMock[0],
  UpdateProductMock,
);
