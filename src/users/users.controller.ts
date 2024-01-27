import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuards } from 'src/auth/guards/role-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserEntity } from 'src/database/entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // Retorna todas as informações do usuário
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Get('infouser')
  InfoUser(
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }


  // Retorna todo os usuários
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.usersService.FindAllUsers();
  }

  // Retorna usuário baseado no id
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.FindOne(+id);
  }

  // Edita um usuário, pode ser usada por admin ou pelo proprio usuário
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUser(+id, updateUserDto);
  }


  // Deleta um usuário (soft delete)
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("id chegado na delete", id)
    return this.usersService.RemoveUser(+id);
  }
}
