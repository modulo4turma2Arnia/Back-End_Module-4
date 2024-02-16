import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuards } from '../auth/guards/role-guard';
import { AuthGuard } from '../auth/guards/auth-guard';
import { Roles } from '../auth/decorators/roles';
import { RoleEnum } from '../enums/role.enum';
import { FileDTO } from '../auth/dto/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDoc } from './docs/create-product.doc';
import { CreatedProductDoc } from './docs/created-product.doc';
import { DeleteProductResponseDoc } from './docs/delete-product-response.doc';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: CreateProductDoc,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedProductDoc,
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: FileDTO,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.CreateProduct(createProductDto, file);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @ApiResponse({
    type: CreatedProductDoc,
    isArray: true,
  })
  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('price') price?: number,
  ) {
    return this.productsService.FindAll(page, limit, name, price);
  }

  @ApiResponse({
    type: CreatedProductDoc,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.FindOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.UpdateProduct(+id, updateProductDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteProductResponseDoc,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.RemoveProduct(+id);
  }
}
