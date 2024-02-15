import { Test, TestingModule } from '@nestjs/testing';
import { JewelryService } from './jewelry.service';
import { CreateJewelryMock, JewelryRepositoryMock, ListJewelrysMock, UpdateJewelryMock, UpdatedJewelryMock } from '../testing/jewelry/index';
import { ListUsersMock, UserRepositoryMock } from '../testing/users/index';
import { GetFilesMock } from '../testing/users/index';
import { HttpException } from '@nestjs/common';

describe('JewelryService', () => {
  let service: JewelryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelryService, JewelryRepositoryMock, UserRepositoryMock],
    }).compile();

    service = module.get<JewelryService>(JewelryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Jelwery', () => {
    it('it should be possible to create a Jelwery', async () => {
      const Photo = await GetFilesMock();

      jest.spyOn(JewelryRepositoryMock.useValue, 'exists').mockResolvedValue(false as never);

      const NewJewelry = await service.CreateJewelry(CreateJewelryMock, Photo);

      await expect(NewJewelry).toEqual(ListJewelrysMock[0]);
    });

    it('should return an exception if a Jelwery with the same name already exists', async () => {
      const Photo = await GetFilesMock();

      jest.spyOn(JewelryRepositoryMock.useValue, 'exists')
        .mockResolvedValue(true as never);

      const CreateJewelry = service.CreateJewelry(CreateJewelryMock, Photo);

      await expect(CreateJewelry).rejects.toThrow(HttpException);
    });

    it('should return an error If there is no image or if more than one image is uploaded', async () => {
      const Photo = null;

      jest
        .spyOn(JewelryRepositoryMock.useValue, 'exists')
        .mockResolvedValue(false as never);

      const CreateJewelry = service.CreateJewelry(CreateJewelryMock, Photo);

      await expect(CreateJewelry).rejects.toThrow(HttpException);
    });

    it('should return an error if the provided file is not an image', async () => {
      const NonImageFile = await GetFilesMock();
      NonImageFile.originalname = 'document.pdf';
      NonImageFile.mimetype = 'application/pdf';

      jest
        .spyOn(JewelryRepositoryMock.useValue, 'exists')
        .mockResolvedValue(false as never);

      const CreateJewelry = service.CreateJewelry(
        CreateJewelryMock,
        NonImageFile,
      );

      await expect(CreateJewelry).rejects.toThrow(HttpException);
    });
  });

  describe("FindAllJewelry", () => {
    it('should return a list of all jewelrys', async () => {
      const result = await service.FindAllJewelry();

  expect(result).toEqual(ListJewelrysMock);
    }) 

    it('should return a message of jewelrys register have no one jewelry', async () => {

      jest.spyOn(JewelryRepositoryMock.useValue, 'find').mockResolvedValue([] as never);

      const result = service.FindAllJewelry();

      expect(result).rejects.toThrow(HttpException)
    })

  })

  describe("Find One by id", () => {
    it("should return a jewel when an id is sent", async () => {

      const result = await service.findOne(ListJewelrysMock[0].id)

      expect(result).toEqual(ListJewelrysMock[0])
    })

    it("should return an error when an id is not found", async () => {
      jest
      .spyOn(JewelryRepositoryMock.useValue, 'findOne')
      .mockResolvedValue(null as never);

    const result = service.findOne(ListJewelrysMock[0].id);

    await expect(result).rejects.toThrow(HttpException);
    })

  })

  describe("Give a jewel to users", () => {
    it("Should be possible to give a jewel to users", async () => {

      const userWithJewelry = { ...ListUsersMock[0], jewelries: [{ type: ListJewelrysMock[0].type }] };
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(userWithJewelry as never);
    
      jest.spyOn(JewelryRepositoryMock.useValue, 'findOne').mockResolvedValue(ListJewelrysMock[0] as never);
      
      const result = await service.GiveJewelryToUser(ListUsersMock[0].id, ListJewelrysMock[0].id)
    
      expect(result).toEqual({
        Sucess: `Credits successfully assigned to user`,
      });
    });
    
    it("Should be possible to give a new jewel to users", async () => {
      const userWithJewelry = { ...ListUsersMock[0], jewelries: [] }; 
      jest.spyOn(UserRepositoryMock.useValue, 'findOne').mockResolvedValue(userWithJewelry as never);
    
      // Mock para encontrar a joia
      jest.spyOn(JewelryRepositoryMock.useValue, 'findOne').mockResolvedValue(ListJewelrysMock[1] as never);
      
      const result = await service.GiveJewelryToUser(ListUsersMock[0].id, ListJewelrysMock[1].id);
    
      expect(result).toEqual({
        Sucess: `Jewel "${ListJewelrysMock[1].id}" and credits successfully assigned to the user`,
      });
    });
    


    it("Should return an error when no user is found", async () => {
      jest
      .spyOn(UserRepositoryMock.useValue, 'findOne')
      .mockResolvedValue(null as never);

      jest
      .spyOn(JewelryRepositoryMock.useValue, 'findOne')
      .mockResolvedValue(null as never);

      const result = service.GiveJewelryToUser(ListUsersMock[0].id, ListJewelrysMock[0].id)

    await expect(result).rejects.toThrow(HttpException);

    })


  })

  describe("Update Jewelry", () => {
    it("Should be possible update a jewelry", async () => {

      jest.spyOn(JewelryRepositoryMock.useValue, 'findOne').mockResolvedValue(ListJewelrysMock[0] as never);

      const result = await service.Update(ListJewelrysMock[0].id, UpdateJewelryMock)
      
     expect(result).toEqual(UpdatedJewelryMock)
    })


    it("return an error if jewelry not found", async () => {

      jest.spyOn(JewelryRepositoryMock.useValue, 'findOne').mockResolvedValue(null as never);

      const result = service.Update(ListJewelrysMock[0].id, UpdateJewelryMock)
      
    await expect(result).rejects.toThrow(HttpException)
    })


  })

  describe("Soft delete", () => {
    it("Should be possible remove a jewelry from database", async () => {

      jest.spyOn(JewelryRepositoryMock.useValue, 'findOne').mockResolvedValue(ListJewelrysMock[0] as never)

      const result = await service.Remove(ListJewelrysMock[0].id)
      
       expect(result).toEqual({ result: `Jewelry with id ${ListJewelrysMock[0].id} has been remove.` })
    })

    it("Return an error with jewelry id not found", async () => {

      jest
      .spyOn(JewelryRepositoryMock.useValue, 'findOne')
      .mockResolvedValue(null as never);

    const result = service.Remove(ListJewelrysMock[0].id);

    await expect(result).rejects.toThrow(HttpException);
       
    })


  })
})