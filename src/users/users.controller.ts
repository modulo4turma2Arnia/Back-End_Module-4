import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

ApiTags('Users');
ApiBearerAuth();
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @ApiResponse({ status: 200, description: 'Retorna informações do usuário' })
  @Get('infouser')
  InfoUser(@CurrentUser() currentUser: UserEntity) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  @ApiResponse({ status: 200, description: 'Retorna todos os usuários' })
  findAll() {
    return this.usersService.FindAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retorna um usuário pelo ID' })
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.RemoveUser(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Post('rescue/:productId')
  async rescueProduct(
    @Param('productId') productId: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.RescueProduct(+productId, +currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch('chg/password') // Correção na rota, adicionando o ':'
  async updatePassword(
    @Body() NewPassWord: ChangePasswordDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.changePassword(currentUser.id, NewPassWord);
  }
}
