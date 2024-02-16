import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from '../enums/role.enum';
import { RolesGuards } from '../auth/guards/role-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles';
import { AuthGuard } from '../auth/guards/auth-guard';
import { UserEntity } from '../database/entities/index';
import { ChangePasswordDto } from './dto/update-user.password.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserResponseDoc } from './docs/delete-user-response.doc';
import { CreatedUserDoc } from 'src/auth/docs/created-user.doc';
import { GetLogedUserDoc } from './docs/get-loged-user.doc';
import { UpdateUserPasswordDoc } from './docs/update-user.password.doc';
import { UpdateUserPasswordResponseDoc } from './docs/update-user.password.response.doc';
import { RescueProductsDoc } from './docs/rescue-products.doc';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetLogedUserDoc,
  })
  @Get('infouser')
  InfoUser(@CurrentUser() currentUser: UserEntity) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreatedUserDoc,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.usersService.FindAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreatedUserDoc,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.FindOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPayload: UpdateUserDto) {
    return this.usersService.UpdateUser(+id, updateUserPayload);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: DeleteUserResponseDoc,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.RemoveUser(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @ApiResponse({
    status: HttpStatus.OK,
    type: RescueProductsDoc,
  })
  @Post('rescue/:productId')
  async rescueProduct(
    @Param('productId') productId: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.RescueProduct(+productId, +currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @ApiBody({
    type: UpdateUserPasswordDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateUserPasswordResponseDoc,
  })
  @Patch('chg/password') // Correção na rota, adicionando o ':'
  async updatePassword(
    @Body() NewPassWord: ChangePasswordDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.ChangePassword(currentUser.id, NewPassWord);
  }
}
