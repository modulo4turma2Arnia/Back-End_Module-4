import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "src/database/entities";


export const ProductsRepositoryMock = {
    provide: getRepositoryToken(ProductEntity),
    useValue: {
        exists: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    }
}