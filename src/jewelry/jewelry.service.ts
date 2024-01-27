import {
  Injectable,
  UnsupportedMediaTypeException,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import { FileDTO } from 'src/auth/dto/files.dto';
import { Repository } from 'typeorm';
import { appFireBase } from 'src/firebase/firebase.config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/index';
import { JewelryEntity } from '../database/entities/index';
const storage = getStorage(appFireBase);

@Injectable()
export class JewelryService {
  constructor(
    @InjectRepository(JewelryEntity)
    private JewelryRepository: Repository<JewelryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async CreateJewelry(createJewelryDto: CreateJewelryDto, photo: FileDTO) {
    let ImageURL: string | null = null;

    try {
    // Se não houver imagem ou se mais de uma imagem for enviada
    if (!photo || (Array.isArray(photo) && photo.length > 1)) {
      throw new BadRequestException('Please provide exactly one image.');
  }

  // Se imagem existir e não for uma imagem
  if (photo && !photo.mimetype.startsWith('image/')) {
      throw new UnsupportedMediaTypeException(
          'Only image files are allowed.',
      )
  }
      const JewelryPayload = {
        ...createJewelryDto,
        image: ImageURL,
      };

      if (
        await this.JewelryRepository.exists({
          where: { type: createJewelryDto.type },
        })
      ) {
        throw new BadRequestException(
          'There is already a jewelry with this name.',
        );
      }

      const New_Jewelry = this.JewelryRepository.create(JewelryPayload);
      await this.JewelryRepository.save(New_Jewelry);

      return New_Jewelry;
    } catch (error) {
      console.log('Erro =>', error);

      throw new HttpException(error.message, error.status);
    }
  }

  async FindAllJewelry() {
    return await this.JewelryRepository.find();
  }

  async findOne(id: number) {
    return await this.JewelryRepository.findOne({
      where: { id },
    });
  }

  async GiveJewelryToUser(userId: number, jewelryId: number) {
    try {
 // Buscar o usuário e a joia pelos IDs
const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['jewelries'] });
const jewelry = await this.JewelryRepository.findOne({ where: { id: jewelryId } });

console.log('user encontrada', user);
console.log('joia encontrada', jewelry);

if (!user || !jewelry) {
  throw new NotFoundException('User or jewel not found.');
}

// Verificar se user.jewelries é um array
if (!Array.isArray(user.jewelries)) {
  // Se não for um array (pode ser undefined), inicialize como uma array vazia
  user.jewelries = [];
}

// Adicionar a nova joia ao array sem substituir as existentes
user.jewelries.push(jewelry);

// Salvar as alterações no banco de dados
await this.userRepository.save(user);

      return {
        Sucess: `Jewel id ${jewelry.id} (${jewelry.type}) successfully assigned to the user`,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, UpdateJewelryDto: UpdateJewelryDto) {
    try {
      const Verify_Jewelry = await this.JewelryRepository.findOne({
        where: { id },
      });

      if (!Verify_Jewelry) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Atualizando a joia
      await this.JewelryRepository.update(id, UpdateJewelryDto);

      // busca novamente depois da atualização
      const updatedJewelry = await this.JewelryRepository.findOne({
        where: { id },
      });

      return updatedJewelry;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} jewelry`;
  }
}
