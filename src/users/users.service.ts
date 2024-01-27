import { Injectable,NotFoundException  , HttpException} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
constructor(
  @InjectRepository(UserEntity)
  private UserRepository: Repository<UserEntity>
){}


  async FindAllUsers() {
    return await this.UserRepository.find();
  }

  async FindOne(id: number) {
    return  await this.UserRepository.findOne({
      where: { id }
    });
  }


  async GetInfoUsers(id: number) {
    console.log('id chegado na get info', id)
    return  await this.UserRepository.findOne({
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

 async RemoveUser(id: number) {
    try {
      const existingUser = await this.UserRepository.findOne({ where: { id } });

      if(existingUser){
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
}
