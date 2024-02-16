import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { CreateJewelryDto } from './dto/create-jewelry.dto';
import { UpdateJewelryDto } from './dto/update-jewelry.dto';
import { Roles } from '../auth/decorators/roles';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuards } from '../auth/guards/role-guard';
import { RoleEnum } from '../enums/role.enum';
import { FileDTO } from '../auth/dto/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateJewelryDoc } from './docs/create-jewelry.doc';
import { CreatedJewelryDoc } from './docs/created-jewelry.doc';
import { GiveJewelryDoc } from './docs/give-jewelry.doc';
import { UpdateJewelryDoc } from './docs/update-jewelry.doc';
import { DeleteJewelryResponseDoc } from './docs/delete-jewelry-response.doc';
import { UpdatedJewelryDoc } from './docs/updated-jewelry.doc ';
import { GiveJewelryResponseDoc } from './docs/give-jewelry-response.doc';

@ApiTags('Jewelry')
@ApiBearerAuth()
@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: CreateJewelryDoc,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedJewelryDoc,
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: FileDTO,
    @Body() createJewelryDto: CreateJewelryDto,
  ) {
    return this.jewelryService.CreateJewelry(createJewelryDto, file);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @ApiResponse({
    type: CreatedJewelryDoc,
    isArray: true,
  })
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.jewelryService.FindAllJewelry();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: GiveJewelryDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GiveJewelryResponseDoc,
  })
  @Post(':userId/:jewelryId')
  GiveJewelry(
    @Param('userId') userId: string,
    @Param('jewelryId') jewelryId: string,
  ) {
    return this.jewelryService.GiveJewelryToUser(+userId, +jewelryId);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreatedJewelryDoc,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jewelryService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: UpdateJewelryDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdatedJewelryDoc,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJewelryDto: UpdateJewelryDto) {
    return this.jewelryService.Update(+id, updateJewelryDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: DeleteJewelryResponseDoc,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jewelryService.Remove(+id);
  }
}
