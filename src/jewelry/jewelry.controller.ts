import { Controller, Get, Post, UseInterceptors, Body, Patch, Param, Delete, UseGuards, UploadedFile } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import { Roles } from 'src/auth/decorators/roles';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { RolesGuards } from 'src/auth/guards/role-guard';
import { RoleEnum } from 'src/enums/role.enum';
import { FileDTO } from 'src/auth/dto/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}


  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: FileDTO,
    @Body() createJewelryDto: CreateJewelryDto) {
    return this.jewelryService.CreateJewelry(createJewelryDto, file);
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Get()
  findAll() {
    return this.jewelryService.FindAllJewelry();
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Post(':userId/:jewelryId')  
  GiveJewelry(@Param('userId') userId: string, @Param('jewelryId') jewelryId: string) {
    return this.jewelryService.GiveJewelryToUser(+userId, +jewelryId);
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jewelryService.findOne(+id);
  }


  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJewelryDto: UpdateJewelryDto) {
    return this.jewelryService.update(+id, updateJewelryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jewelryService.remove(+id);
  }
}
