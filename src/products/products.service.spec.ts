import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import {
  CreateProductMock,
  ListProductsMock,
  ProductsRepositoryMock,
  UpdateProductMock,
  UpdatedProductsMock,
} from '../testing/index';
import { GetFilesMock } from '../testing/index';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';


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

  describe('Create Products', () => {
    it('it should be possible to create a product', async () => {
      const Photo = await GetFilesMock();

      jest
        .spyOn(ProductsRepositoryMock.useValue, 'exists')
        .mockResolvedValue(false);

      const NewProduct = await service.CreateProduct(CreateProductMock, Photo);

      expect(NewProduct).toEqual(ListProductsMock[3]);
    });

    it('should return an exception if a product with the same name already exists', async () => {
      const Photo = await GetFilesMock();

      jest
        .spyOn(ProductsRepositoryMock.useValue, 'exists')
        .mockResolvedValue(true);

      const createProduct = service.CreateProduct(CreateProductMock, Photo);

      await expect(createProduct).rejects.toThrow(HttpException);
    });

    it('should return an error If there is no image or if more than one image is uploaded', async () => {
      const Photo = null;

      jest
        .spyOn(ProductsRepositoryMock.useValue, 'exists')
        .mockResolvedValue(false);

      const createProduct = service.CreateProduct(CreateProductMock, Photo);

      await expect(createProduct).rejects.toThrow(HttpException);
    });

    it('should return an error if the provided file is not an image', async () => {
      const NonImageFile = await GetFilesMock();
      NonImageFile.originalname = 'document.pdf';
      NonImageFile.mimetype = 'application/pdf';

      jest
        .spyOn(ProductsRepositoryMock.useValue, 'exists')
        .mockResolvedValue(false);

      const createProduct = service.CreateProduct(
        CreateProductMock,
        NonImageFile,
      );

      await expect(createProduct).rejects.toThrow(HttpException);
    });
  });

  describe('Find All Products', () => {
    it('should return a list of all products', async () => {
      const result = await service.FindAll(1, 5, 'produto', 50);

      expect(result).toEqual(ListProductsMock);
    }) 
  })

  describe('Search product by id', () => {
    it("must be able to return a product when an id is sent to function", async () => {

      const result = await service.findOne(ListProductsMock[0].id)

      expect(result).toEqual(ListProductsMock[0]);

    })
  })


  describe('Update product by id', () => {
    it("Must be able to update a product when an id and payload is sent to function", async () => {

      const result = await service.UpdateProduct(ListProductsMock[0].id, UpdateProductMock)

      expect(result).toEqual(UpdatedProductsMock);

    })

    it("Should throw an exception if a product with the sent id is not found", async () => {
      // Arrange
      jest.spyOn(ProductsRepositoryMock.useValue, 'findOne').mockResolvedValue(null as never);
    
      // Act
      const updatePromise = service.UpdateProduct(ListProductsMock[0].id, UpdateProductMock);
    
      // Assert
      await expect(updatePromise).rejects.toThrow(HttpException);
    });
    


  })


});
