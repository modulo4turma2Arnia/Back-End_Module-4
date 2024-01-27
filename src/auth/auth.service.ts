import {
    BadRequestException,
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';

  import { Repository } from 'typeorm';


  import { LoginDTO } from './dto/login.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import * as bcrypt from 'bcrypt';
  import { UserRegisterDto } from './dto/register.dto';
  import { UserEntity } from '../database/entities';

  import { JwtService } from '@nestjs/jwt';
import { FileDTO } from './dto/files.dto';
import { appFireBase } from 'src/firebase/firebase.config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
const storage = getStorage(appFireBase);



  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
  
      private jwtService: JwtService,
    ) {}
  






    async RegisterAuthService(PayLoad: UserRegisterDto, file: FileDTO) {
      let ImageURL: string | null = null;

      // se imagem existir
      if (file) {
        const [extension] = file.originalname.split('.');
        console.log('original name', file.originalname);
        const formattedFilename = `${Date.now()}.${extension}`;
  
        const storageRef = ref(storage, formattedFilename);
        await uploadBytesResumable(storageRef, file.buffer);
        ImageURL = await getDownloadURL(storageRef);
      }

      const UserPayload = {
        ...PayLoad,
        profileImage: ImageURL,
      };

      


      try {
        if (
          // verificando se ja existe user com este email
          await this.usersRepository.exists({ where: { email: PayLoad.email } })
        ) {
          throw new BadRequestException(
            'There is already a user with this email.',
          )
        }
          // Se não tiver, criar um
        const New_User = this.usersRepository.create(UserPayload);
            //salvar no banco
        await this.usersRepository.save(New_User);
  
        return New_User;
      } catch (error) {
        console.log('Erro =>',error);
  
        throw new HttpException(error.message, error.status);
      }
    }
  
    async LoginAuthService(PayLoad: LoginDTO) {
      try {
        const { email, password } = PayLoad;
          // lembrar que true é pra que as propriedades sejam includias no retorno da consulta

        const Verify_User = await this.usersRepository.findOne({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
          },
        });
  
        if (!Verify_User) {
          throw new UnauthorizedException('wrong email or password.');
        }
  
        const Verify_password = await bcrypt.compare(
          password,
          Verify_User.password,
        );
  
        if (!Verify_password) {
          throw new UnauthorizedException('wrong email or password.');
        }
  
        const Token = {
          id: Verify_User.id,
          email: Verify_User.email,
          role: Verify_User.role,
        };
  
        return {
          token: await this.jwtService.signAsync(Token),
        }
      } catch (error) {
        console.log(error);
  
        throw new HttpException(error.message, error.status);
      }
    }
  }