import { ProductsService } from "../../products/products.service";


export const ProductServiceMock = {
  provide: ProductsService,
  useValue: {
    CreateProduct: jest.fn(),
    FindAll: jest.fn(),
    FindOne: jest.fn(),
    UpdateProduct: jest.fn(),
    RemoveProduct: jest.fn(),
  },
};