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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateJewelryDoc } from './docs/create-jewelry.doc';
import { CreatedJewelryDoc } from './docs/created-jewelry.doc';
import { GiveJewelryDoc } from './docs/give-jewelry.doc';
import { UpdateJewelryDoc } from './docs/update-jewelry.doc';
import { DeleteJewelryResponseDoc } from './docs/delete-jewelry-response.doc';
import { UpdatedJewelryDoc } from './docs/updated-jewelry.doc ';
import { GiveJewelryResponseDoc } from './docs/give-jewelry-response.doc';
import { BadRequestCreateJewelryDoc } from './docs/bad-request-create-jewelry.doc';
import { NotFoundGetIdJewelryDoc } from './docs/not-found-get-id-jewelry.doc';
import { NotFoundGetAllJewelryDoc } from './docs/not-found-get-all-jewelry.doc';
import { NotFoundGiveJewelryDoc } from './docs/not-founs-give-jewelry.doc';
import { NotFoundUpdateJewelryDoc } from './docs/not-found-update-jewelry.doc';

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
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestCreateJewelryDoc,
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
  @Roles(RoleEnum.admin)
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundGetAllJewelryDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreatedJewelryDoc,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.jewelryService.FindAllJewelry();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: GiveJewelryDoc,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundGiveJewelryDoc,
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
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundGetIdJewelryDoc,
  })
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
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundUpdateJewelryDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdatedJewelryDoc,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJewelryDto: UpdateJewelryDto) {
    return this.jewelryService.Update(+id, updateJewelryDto);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
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
