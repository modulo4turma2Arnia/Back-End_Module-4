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
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuards } from 'src/auth/guards/role-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserEntity } from 'src/database/entities';
import { ChangePasswordDto } from './dto/update-user.password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Get('infouser')
  InfoUser(@CurrentUser() currentUser: UserEntity) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.usersService.FindAll_Users();
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.FindOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUser(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.Remove_User(+id);
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
  @Patch('ch/password') // Correção na rota, adicionando o ':'
  async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.changePassword(currentUser.id, changePasswordDto);
  }
}

