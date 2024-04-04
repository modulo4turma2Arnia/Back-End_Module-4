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
import axios from 'axios';
import cheerio, { text } from 'cheerio';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductPayload: CreateProductDto, photo: FileDTO) {
    let ImageURL: string | null = null;

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

  async findAll(
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

      // // modo antigo com tolerancia
      // if (price) {
      //   // a pesquisa deve ser feita com valores proximos tambem? perguntar o luiz
      //   // Utiliza operadores >= e <= para buscar valores próximos
      //   const tolerance = 1; // Ajuste conforme necessário
      //   queryBuilder = queryBuilder
      //     .andWhere('product.price >= :minPrice', { minPrice: price - tolerance })
      //     .andWhere('product.price <= :maxPrice', {
      //       maxPrice: price + tolerance,
      //     });
      // }
      if (price) {
        queryBuilder = queryBuilder.andWhere('product.price = :price', {
          price,
        });
      }

      // Aplicando a paginação com os filtros recebidos e retorna os resultados
      const results = await queryBuilder.skip(skip).take(limit).getMany();
      return results;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
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

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
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

  async removeProduct(id: number) {
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

  // async searchBestPrices(nomesProdutos) {
  //   const baseUrl = 'https://lista.mercadolivre.com.br/';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'User-Agent':
  //         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.86 Safari/537.36',
  //     },
  //   };
  
  //   try {
  //     if (!Array.isArray(nomesProdutos)) {
  //       nomesProdutos = [nomesProdutos]; // Transforma em array se não for
  //     }
  //     for (const nomeProduto of nomesProdutos) {
  //       const queryParams = `_OrderId_PRICE_NoIndex_True?matt_tool=26961925&matt_word=${nomeProduto}&matt_source=google&matt_campaign_id=12415024293&matt_ad_group_id=122942096136&matt_match_type=e&matt_network=g&matt_device=c&matt_creative=522955851545&matt_keyword=${nomeProduto}&matt_target_id=aud-1966858076296%3Akwd-296466936639&cq_src=google_ads&cq_cmp=12415024293&cq_net=g&cq_plt=gp`;
  //       const url = `https://lista.mercadolivre.com.br/${nomeProduto}_OrderId_PRICE_NoIndex_True?matt_tool=26961925&matt_word=mochila-notebook&matt_source=google&matt_campaign_id=12415024293&matt_ad_group_id=122942096136&matt_match_type=e&matt_network=g&matt_device=c&matt_creative=522955851545&matt_keyword=mochila+notebook&matt_ad_position=&matt_ad_type=&matt_merchant_id=&matt_product_id=&matt_product_partition_id=&matt_target_id=aud-1966858076296%3Akwd-296466936639&cq_src=google_ads&cq_cmp=12415024293&cq_net=g&cq_plt=gp&cq_med=&gad_source=1&gclid=Cj0KCQjwn7mwBhCiARIsAGoxjaLlEwmQj6T4x6AlqhrM04uRFi04PGogDwWPwYASO0l3P8Tr-_vm4_saAiZUEALw_wcB`
  //       const response = await fetch(url, options);
  //       if (response.ok) {
  //         const html = await response.text();
  //         const $ = cheerio.load(html);
  //         const divs = $('.ui-search-layout__item.shops__layout-item.ui-search-layout__stack');
  //         console.log(`Quantidade de divs para "${nomeProduto}": ${divs.length}`);
  //               // Itera sobre cada div e acessa o texto dentro dela
  //     divs.each((index, element) => {
  //       const textoDaDiv = $(element).text();
  //       console.log(`Texto dentro da div ${index + 1}: ${textoDaDiv}`);
  //     });
      
  //       } else {
  //         console.error('Erro ao fazer a requisição:', response.status);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Erro ao fazer a requisição:', error);
  //   }
  // }
}
