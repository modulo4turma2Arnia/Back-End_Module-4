import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpException,
  UnsupportedMediaTypeException,
  UnauthorizedException,
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
    const { name } = createProductPayload
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

      // Se imagem existir e não for uma imagem
      if (photo && !photo.mimetype.startsWith('image/')) {
        throw new UnsupportedMediaTypeException(
          'Only image files are allowed.',
        );
      }

        // Caso exista o arquivo de foto
      if (photo) {
        const [extension] = photo.originalname.split('.');
        const formattedFilename = `${Date.now()}.${extension}`;

        const storageRef = ref(storage, formattedFilename);
        await uploadBytesResumable(storageRef, photo.buffer);
        ImageURL = await getDownloadURL(storageRef);
      }

      const ProductPayload = {
        ...createProductPayload,
        image: ImageURL,
      }


      const New_Product = this.ProductRepository.create(ProductPayload);
      await this.ProductRepository.save(New_Product);

      return New_Product;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async FindAll(
    page: number = 1,
    limit: number = 5,
    name: string,
    price: number,
  ) {
    const skip = (page - 1) * limit;

    let queryBuilder = this.ProductRepository.createQueryBuilder('product');

    // Adiciona condições opcionais se os parâmetros estiverem presentes
    if (name) {
      // Usa ILIKE para pesquisa case-insensitive
      queryBuilder = queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (price) {
      // Utiliza operadores >= e <= para buscar valores próximos
      const tolerance = 5; // Ajuste conforme necessário
      queryBuilder = queryBuilder
        .andWhere('product.price >= :minPrice', { minPrice: price - tolerance })
        .andWhere('product.price <= :maxPrice', {
          maxPrice: price + tolerance,
        });
    }

    // Aplica a paginação e retorna os resultados
    const results = await queryBuilder.skip(skip).take(limit).getMany();
    return results;
  }

  async findOne(id: number) {
    return await this.ProductRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const Verify_Product = await this.ProductRepository.findOne({
        where: { id },
      });

      if (!Verify_Product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Atualizando o produto com os dados
      await this.ProductRepository.update(id, updateProductDto);

      // busca novamente depois aa atualização
      const updatedProduct = await this.ProductRepository.findOne({
        where: { id },
      });

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async Remove_Product(id: number) {
    try {
      const Verify_Product = await this.ProductRepository.findOne({
        where: { id },
      });

      if (Verify_Product) {
        // 2 tipos, softdelete e softremove , achei o softDelete melhor
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
