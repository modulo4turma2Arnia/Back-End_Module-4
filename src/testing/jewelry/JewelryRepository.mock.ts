import { getRepositoryToken } from "@nestjs/typeorm";
import { JewelryEntity } from "src/database/entities";
import { JewelryMock } from "./Jewelry.Mock";

export const JewelryRepositoryMocks = {
    provide: getRepositoryToken(JewelryEntity),
    useValue: {
        exists: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
    }
}
