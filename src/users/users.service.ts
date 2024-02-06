import {
  Injectable,
  NotFoundException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/update-user.password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async FindAll_Users() {
    return await this.UserRepository.find();
  }

  async FindOne(id: number) {
    return await this.UserRepository.findOne({
      where: { id },
    });
  }

  async GetInfoUsers(id: number) {
    console.log('id chegado na get info', id);
    return await this.UserRepository.findOne({
      where: { id },
      relations: { products: true, jewelries: true },
    });
  }

  async UpdateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.UserRepository.findOne({ where: { id } });

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Atualizando o usuario com os dados
      await this.UserRepository.update(id, updateUserDto);

      // busca novamente depois aa atualização
      const updatedUser = await this.UserRepository.findOne({ where: { id } });

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async Remove_User(id: number) {
    try {
      const existingUser = await this.UserRepository.findOne({ where: { id } });

      if (existingUser) {
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

  async RescueProduct(productId: number, user: UserEntity) {
    try {
      //console.log('Received productId:', productId);

      // Verifica se productId é um número válido
      if (isNaN(productId) || productId <= 0) {
        // console.log('Invalid productId detected.');
        throw new BadRequestException('Invalid productId');
      }

      //console.log('Finding product by ID:', productId);

      // Encontrar o produto pelo ID
      const product = await this.productRepository.findOneOrFail({
        where: { id: productId },
      });

      //console.log('Product rescue successful:', product);

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.UserRepository.findOne({
        where: { id: userId },
        select: ['id', 'password'],
      });

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
