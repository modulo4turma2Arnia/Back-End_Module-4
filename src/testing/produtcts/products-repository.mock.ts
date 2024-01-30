import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "../../database/entities/index";
import { ListProductsMock } from "./products-list.mock";


export const ProductsRepositoryMock = {
  provide: getRepositoryToken(ProductEntity),
  useValue: {
    exists: jest.fn(),
    create: jest.fn(() => ListProductsMock[3]),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn(),
      andWhere: jest.fn(),
      skip: jest.fn(),
      take: jest.fn().mockReturnValue(5), // Valor padrão para o método take
      getMany: jest.fn().mockResolvedValue(ListProductsMock),
    })),
  },
};

  
  
  