import { JewelryService } from "../../jewelry/jewelry.service";


export const JewelryServiceMock = {
  provide: JewelryService,
  useValue: {
    CreateJewelry: jest.fn(),
    FindAllJewelry: jest.fn(),
    findOne: jest.fn(),
    GiveJewelryToUser: jest.fn(),
    Update: jest.fn(),
    Remove: jest.fn(),
  },
};