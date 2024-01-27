import { Test, TestingModule } from '@nestjs/testing';
import { JewelryService } from './jewelry.service';
import { initializeApp, FirebaseOptions, getApp } from 'firebase/app';
import { appFireBase } from 'src/firebase/firebase.config';
import { JewelServiceMocks, JewelryMock, UserRepositoryMocks,JewelryListMock,JewelryRepositoryMocks, ImageMock } from 'src/testing';

describe('JewelryService', () => {
  let service: JewelryService;

  beforeEach(async () => {

       // Verifica se o Firebase já foi iniciado
       const existingApp = getApp('[DEFAULT]')
        
       if (!existingApp) {
           // Configuração do Firebase pra fazer os testes
           const firebaseConfig: FirebaseOptions = appFireBase as FirebaseOptions;  // Converter para FirebaseOptions

           initializeApp(firebaseConfig, '[DEFAULT]')
       }


    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelryService, JewelryRepositoryMocks, UserRepositoryMocks],
    }).compile();

    service = module.get<JewelryService>(JewelryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  describe("CreateJewelry", () => {
    it("Should be create a jewelry", async ()  => {

      const ImageMockFile = await ImageMock();
      const NewJewelry = await JewelServiceMocks.
    })
  })
});
