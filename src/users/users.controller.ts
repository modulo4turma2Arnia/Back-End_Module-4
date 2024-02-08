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
    return this.usersService.FindAll_Users();
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
  @ApiResponse({ status: 200, description: 'Atualiza um usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUser(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Remove um usuário' })
  remove(@Param('id') id: string) {
    return this.usersService.Remove_User(+id);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Post('rescue/:productId')
  @ApiResponse({ status: 200, description: 'Resgata um produto' })
  async rescueProduct(
    @Param('productId') productId: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.RescueProduct(+productId, currentUser);
  }

  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin, RoleEnum.customer)
  @Patch('ch/password') // Correção na rota, adicionando o ':'
  @ApiResponse({ status: 200, description: 'Atualiza a senha do usuário' })
  async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.usersService.changePassword(currentUser.id, changePasswordDto);
  }
}
