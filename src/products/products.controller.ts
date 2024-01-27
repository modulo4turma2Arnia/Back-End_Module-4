import { Controller, Get, Post, Body, Patch, Param,Query, Delete,UseGuards,UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuards } from 'src/auth/guards/role-guard';
import { AuthGuard } from '../auth/guards/auth-guard';
import { Roles } from 'src/auth/decorators/roles';
import { RoleEnum } from 'src/enums/role.enum';
import { FileDTO } from 'src/auth/dto/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: FileDTO,
    @Body() createProductDto: CreateProductDto) {
    return this.productsService.Create_Product(createProductDto, file);
  }


  
  @UseGuards(AuthGuard, RolesGuards)
  @Get()
  findAll(

    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
    @Query('price') price?: number,

  ) {
    return this.productsService.findAll(page, limit, name,price);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.Remove_Product(+id);
  }
}
