import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JWTServiceMock, loginPayloadMocks, LoginResponseMocks } from "src/testing/auth";
import { initializeApp, FirebaseOptions, getApp, deleteApp } from "firebase/app";
import { appFireBase } from "src/firebase/firebase.config";
import { CreateUserMock, ImageMock, UsersListMock,UserRepositoryMocks, UserServiceMocks, CreateResponseMock } from "src/testing";
import * as bcrypt from 'bcrypt';
import { HttpException } from "@nestjs/common";


describe('Auth Service', () => {
    let auth_service : AuthService;

    beforeEach(async () => {
        // Verifica se o Firebase já foi iniciado
        const existingApp = getApp('[DEFAULT]')
        
        if (!existingApp) {
            // Configuração do Firebase pra fazer os testes
            const firebaseConfig: FirebaseOptions = appFireBase as FirebaseOptions;  // Converter para FirebaseOptions

            initializeApp(firebaseConfig, '[DEFAULT]')
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserRepositoryMocks, JWTServiceMock],
        }).compile();
        auth_service = module.get<AuthService>(AuthService);
    });

    it('Should be defined', () => {
        expect(auth_service).toBeDefined();
    })

    describe("RegisterAuthService", () => {
        it('Should register a new user if email not exist', async () => {
            const imageMock = await ImageMock(); 
            const NewUser = await auth_service.RegisterAuthService(CreateUserMock, imageMock);
             console.log('new user no test', NewUser)

            expect(NewUser).toEqual(UsersListMock[0])
        })
    })


    describe("RegisterAuthService", () => {
        it('should return an error if there is already a user with the same email address', async () => {
            // Alterando o mock de exists para retornar true , verificar com luiz
            UserRepositoryMocks.useValue.exists.mockResolvedValue(true);
    
            const imageMock = await ImageMock(); 
    
            // Agora, ao chamar RegisterAuthService, ela vai achar um user
            // e lança a exceção 
            await expect(auth_service.RegisterAuthService(CreateUserMock, imageMock)).rejects.toThrowError(
                HttpException 
            )

            UserRepositoryMocks.useValue.exists.mockResolvedValue(false);
        })
    })
    
    


    describe('LoginAuthService ', () => {
        it('Should return a Token if login is valid', async () => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
        
             const result = await auth_service.LoginAuthService(loginPayloadMocks)

             expect(result).toEqual(LoginResponseMocks);
        })
    })
})
