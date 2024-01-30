import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "../../database/entities/index";
import { ListProductsMock } from "./products-list.mock";


export const ProductsRepositoryMock = {
  provide: getRepositoryToken(ProductEntity),
  useValue: {
    exists: jest.fn(),
    create: jest.fn(() => ListProductsMock[3]),
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(() => ListProductsMock[0]),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(ListProductsMock),
    })),
  },
};


  
  
  