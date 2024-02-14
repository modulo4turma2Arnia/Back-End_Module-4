import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  UnsupportedMediaTypeException,
  //UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileDTO } from '../auth/dto/files.dto';
import { appFireBase } from '../firebase/firebase.config';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../database/entities/index';
import { Repository } from 'typeorm';
const storage = getStorage(appFireBase);

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
  ) {}

  async CreateProduct(createProductPayload: CreateProductDto, photo: FileDTO) {
    let ImageURL: string | null = null;
    const { name } = createProductPayload;
    try {
      if (
        await this.ProductRepository.exists({
          where: { name: createProductPayload.name },
        })
      ) {
        throw new BadRequestException(
          'There is already a product with this name.',
        );
      }

      // Se não houver imagem ou se mais de uma imagem for enviada
      if (!photo) {
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

      if (ImageURL != null) {
        const New_Product = this.ProductRepository.create({
          ...createProductPayload,
          image: ImageURL,
        });
        await this.ProductRepository.save(New_Product);
        return New_Product;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async FindAll(
    page: number = 1,
    limit: number = 8,
    name: string,
    price: number,
  ) {
    try {
      const skip = (page - 1) * limit;

      let queryBuilder = this.ProductRepository.createQueryBuilder('product');

      // Adiciona condições opcionais se os parâmetros estiverem presentes
      if (name) {
        // Usa ILIKE pra pesquisa case-insensitive (tanto maiusculas quanto minusculas)
        queryBuilder = queryBuilder.andWhere('product.name ILIKE :name', {
          name: `%${name}%`,
        });
      }

      if (price) {
        // a pesquisa deve ser feita com valores proximos tambem? perguntar o luiz
        // Utiliza operadores >= e <= para buscar valores próximos
        const tolerance = 5; // Ajuste conforme necessário
        queryBuilder = queryBuilder
          .andWhere('product.price >= :minPrice', {
            minPrice: price - tolerance,
          })
          .andWhere('product.price <= :maxPrice', {
            maxPrice: price + tolerance,
          });
      }

      // Aplicando a paginação com os filtros recebidos e retorna os resultados
      const results = await queryBuilder.skip(skip).take(limit).getMany();
      return results;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async FindOne(id: number) {
    try {
      const FindProduct = await this.ProductRepository.findOne({
        where: { id },
      });
      if (FindProduct) {
        return FindProduct;
      } else {
        throw new NotFoundException(`Product Id ${id} not found.`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async UpdateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      const VerifyProduct = await this.ProductRepository.findOne({
        where: { id },
      });

      if (!VerifyProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Atualizando o produto com os dados
      await this.ProductRepository.update(id, updateProductDto);

      // busca novamente depois aa atualização
      const UpdatedProduct = await this.ProductRepository.findOne({
        where: { id },
      });

      return UpdatedProduct;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async RemoveProduct(id: number) {
    try {
      const VerifyProduct = await this.ProductRepository.findOne({
        where: { id },
      });

      if (VerifyProduct) {
        await this.ProductRepository.softDelete(id);
        return { result: `Product with id ${id} has been remove.` };
      } else {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
