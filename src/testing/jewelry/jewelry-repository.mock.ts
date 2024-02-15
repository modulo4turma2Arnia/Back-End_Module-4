import { getRepositoryToken } from '@nestjs/typeorm';
import { JewelryEntity } from '../../database/entities/index';
import { ListJewelrysMock } from './list-jewelry.mock';
import { UpdateJewelryMock } from './update-jewelry.mock';

export const JewelryRepositoryMock = {
  provide: getRepositoryToken(JewelryEntity),
  useValue: {
    exists: jest.fn(() => ListJewelrysMock[0]),
    create: jest.fn(() => ListJewelrysMock[0]),
    find: jest.fn(() => ListJewelrysMock),
    save: jest.fn(),
    softDelete: jest.fn(() => ListJewelrysMock[0].id),
    findOne: jest.fn(() => ListJewelrysMock[0]),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    //update está sendo mockado para retornar um objeto com uma propriedade affected igual a 1, o que geralmente indica que uma linha foi afetada pela atualização no banco de dados.
  },
};
