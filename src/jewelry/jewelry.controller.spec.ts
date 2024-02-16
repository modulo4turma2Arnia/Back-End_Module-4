import { Test, TestingModule } from '@nestjs/testing';
import { JewelryController } from './jewelry.controller';
import { JewelryServiceMock, JwtServiceMock } from '../testing/index';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/index';

describe('JewelryController', () => {
  let controller: JewelryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [JewelryController],
      providers: [JewelryServiceMock, JwtServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<JewelryController>(JewelryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
