import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductMock, ListProductsMock, ProductsRepositoryMock } from '../testing/index';
import { GetFilesMock } from '../testing/index';
import { HttpException } from '@nestjs/common';
import { FileDTO } from 'src/auth/dto/files.dto';


describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepositoryMock],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Create Products", () => {
    it("it should be possible to create a product", async () => {
      const Photo = await GetFilesMock();

      jest.spyOn(ProductsRepositoryMock.useValue, 'exists').mockResolvedValue(false)

      const NewProduct = await service.CreateProduct(CreateProductMock, Photo);

      expect(NewProduct).toEqual(ListProductsMock[3])
    })

    it("should return an exception if a product with the same name already exists", async () => {
      const Photo = await GetFilesMock();
    
      jest.spyOn(ProductsRepositoryMock.useValue, 'exists').mockResolvedValue(true);
    
      const createProduct = service.CreateProduct(CreateProductMock, Photo);
    
      await expect(createProduct).rejects.toThrow(HttpException);
    })
    

    it("should return an error If there is no image or if more than one image is uploaded", async () => {
      const Photo = null
    
      jest.spyOn(ProductsRepositoryMock.useValue, 'exists').mockResolvedValue(false);
    
      const createProduct = service.CreateProduct(CreateProductMock, Photo);
    
      await expect(createProduct).rejects.toThrow(HttpException);
    })

 
    it("should return an error if the provided file is not an image", async () => {
      const NonImageFile = await GetFilesMock();
      NonImageFile.originalname = 'document.pdf';
      NonImageFile.mimetype = 'application/pdf';
    
      jest.spyOn(ProductsRepositoryMock.useValue, 'exists').mockResolvedValue(false);
    
      const createProduct = service.CreateProduct(CreateProductMock, NonImageFile);
    
      await expect(createProduct).rejects.toThrow(HttpException);
    });
    
    
    
    



  })


  describe("Find All Products", () => {
    it('should return a list of all products', async () => {

     
      const result = await service.FindAll(1, 5, 'produto', 50);

    })
  })
});
