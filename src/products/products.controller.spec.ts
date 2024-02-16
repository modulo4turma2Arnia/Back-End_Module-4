import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
//import { ProductsService } from './products.service';
import {
  JwtServiceMock,
  ProductServiceMock,
  authGuardMock,
} from '../testing/index';
import { AuthGuard } from '../auth/guards/auth-guard';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductServiceMock, JwtServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
