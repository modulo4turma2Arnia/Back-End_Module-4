import {
  Injectable,
  NotFoundException,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, UserEntity } from '../database/entities/index';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/update-user.password.dto';
import * as bcrypt from 'bcrypt';


// testando uma nova execeção personalizada
export class InsufficientCreditsException extends HttpException {
  constructor() {
    super('User does not have enough credits.', HttpStatus.BAD_REQUEST);
  }
}


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async FindAllUsers() {
    try {
      const FindAllUsers = await this.UserRepository.find();
      if(FindAllUsers.length > 0){
          return FindAllUsers;
      } else {
        throw new NotFoundException('There are no registered Users')
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async FindOne(id: number) {
    try {
      const UserFound = await this.UserRepository.findOne({
        where: { id }
      });

      if(UserFound){
          return UserFound;
      } else {
        throw new NotFoundException(`There no are registered user with ${id}.`)
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }

  }

  async GetInfoUsers(id: number) {
    try {
    const Getinfo = await this.UserRepository.findOne({
        where: { id },
        relations: { products: true, jewelries: true },
      });

      if(Getinfo){
        return Getinfo;
      } else {
        throw new NotFoundException(`There no user with ${id} registered.`)
      }
    } catch (error) {
    throw new HttpException(error.message, error.status) 
    }
  }

  async UpdateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const ExistingUser = await this.UserRepository.findOne({ where: { id } });

      if (!ExistingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Atualizando o usuario com os dados
      await this.UserRepository.update(id, updateUserDto);

      // busca novamente depois aa atualização
      const updatedUser = await this.UserRepository.findOne({ where: { id } });

      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async RemoveUser(id: number) {
    try {
      const UserFound = await this.UserRepository.findOne({ where: { id } });

      if (UserFound) {
        // 2 tipos, softdelete e softremove , achei o softDelete melhor
        await this.UserRepository.softDelete(id);
        return { result: `User with id ${id} has been deleted.` };
      } else {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async RescueProduct(productId: number, UserId: number) {
    try {

      // procurando produto por id 
      const ProductFound = await this.productRepository.findOne({ where: { id: productId } });
     // procurando user por id 
      const UserFound = await this.UserRepository.findOne({ where: { id: UserId },
        relations: { products: true },
      });
      
      // se usuario foi encontrado ee se o credito dele for mairo que o preço do produto
      if (UserFound && UserFound.credits > ProductFound.price) {
        
        // Deduzir créditos do usuário
        UserFound.credits -= ProductFound.price;

        // adicionando o produto ao array do usuario
        UserFound.products.push(ProductFound);

        // Salvar usuário atualizado
        await this.UserRepository.save(UserFound);
        
        // Recuperar o usuário atualizado
        const UserUpdated = await this.UserRepository.findOne({ where: { id: UserId },
          relations: { products: true },
        })

        return UserUpdated;
      } else if (!ProductFound || !UserFound){
        throw new NotFoundException('User or product not found')
      }
      else {
        throw new InsufficientCreditsException();
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { id: userId },
        select: ['id', 'password'],
      })

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        changePasswordDto.currentPassword,
        user.password,
      );

      if (!isCurrentPasswordValid) {
        throw new HttpException('Current password is incorrect', 400);
      }

      const isNewPasswordSameAsCurrent = await bcrypt.compare(
        changePasswordDto.newPassword,
        user.password,
      );

      if (isNewPasswordSameAsCurrent) {
        throw new HttpException(
          'New password must be different from the current password',
          400,
        );
      }

      const hashedNewPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        10,
      );

      user.password = hashedNewPassword;


      await this.UserRepository.save(user);
      return { Result: 'User Password changed succefully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}