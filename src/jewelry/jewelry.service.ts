import {
  Injectable,
  UnsupportedMediaTypeException,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import { FileDTO } from '../auth/dto/files.dto';
import { Repository } from 'typeorm';
import { appFireBase } from '../firebase/firebase.config';
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

      // Caso exista o arquivo de foto
      if (photo) {
        // Se imagem existir e não for uma imagem
        if (photo && !photo.mimetype.startsWith('image/')) {
          throw new UnsupportedMediaTypeException(
            'Only image files are allowed.',
          );
        }

        const [extension] = photo.originalname.split('.');
        const formattedFilename = `${Date.now()}.${extension}`;

        const storageRef = ref(storage, formattedFilename);
        await uploadBytesResumable(storageRef, photo.buffer);
        ImageURL = await getDownloadURL(storageRef);
      }

      if (
        await this.JewelryRepository.exists({
          where: { type: createJewelryDto.type },
        })
      ) {
        throw new BadRequestException(
          'There is already a jewelry with this name.',
        );
      }

      if (ImageURL != null) {
        const New_Jewelry = this.JewelryRepository.create({
          ...createJewelryDto,
          image: ImageURL,
        });
        await this.JewelryRepository.save(New_Jewelry);
        return New_Jewelry;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async FindAllJewelry() {
    try {
      const findAll = await this.JewelryRepository.find();

      if (findAll.length > 0) {
        return findAll;
      } else {
        throw new NotFoundException(`There are no registered jewels`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const FindJewelry = await this.JewelryRepository.findOne({
        where: { id },
      });
      if (FindJewelry) {
        return FindJewelry;
      } else {
        throw new NotFoundException(`Jewel with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async GiveJewelryToUser(userId: number, jewelryId: number) {
    try {
      // Buscar o usuário e a joia pelos IDs
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['jewelries'],
      });

      const jewelry = await this.JewelryRepository.findOne({
        where: { id: jewelryId },
      });
      if (!user || !jewelry) {
        throw new NotFoundException('User or jewel not found.');
      }

      if (user && jewelry) {
        //some é usado para verificar se pelo menos um item no
        //array user.jewelries possui o mesmo tipo que a joia sendo
        //enviada (jewelry.type). Se hasSameType for true, isso significa
        //que o usuário já possui uma joia com o mesmo tipo;
        const hasSameType = user.jewelries.some(
          (item) => item.type === jewelry.type,
        );

        if (hasSameType) {
          user.credits++;
          await this.userRepository.save(user);

          return {
            Sucess: `Credits successfully assigned to user`,
          };
        } else {
          user.credits++;
          user.jewelries.push(jewelry);

          // Salvar as alterações no banco de dados
          await this.userRepository.save(user);

          return {
            Sucess: `Jewel "${jewelry.id}" and credits successfully assigned to the user`,
          };
        }
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async Update(id: number, UpdateJewelry: UpdateJewelryDto) {
    try {
      const Verify_Jewelry = await this.JewelryRepository.findOne({
        where: { id },
      });

      if (!Verify_Jewelry) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Atualizando a joia
      await this.JewelryRepository.update(id, UpdateJewelry);

      // busca novamente depois da atualização
      const updatedJewelry = await this.JewelryRepository.findOne({
        where: { id },
      });

      return updatedJewelry;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async Remove(id: number) {
    try {
      const VerifyProduct = await this.JewelryRepository.findOne({
        where: { id },
      });

      if (VerifyProduct) {
        await this.JewelryRepository.softDelete(id);
        return { result: `Jewelry with id ${id} has been remove.` };
      } else {
        throw new NotFoundException(`Jewelry with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
