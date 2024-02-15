import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
// import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/files.dto';
import { UserRegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDoc } from './docs/login.doc';
import { LoginResponseDoc } from './docs/loginResponse.doc';
import { AuthGuard } from './guards/auth-guard';
import { RolesGuards } from './guards/role-guard';
import { Roles } from './decorators/roles';
import { RoleEnum } from 'src/enums/role.enum';
import { UserRegisterDoc } from './docs/register.doc';
import { CreatedUserDoc } from './docs/createdUser.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: UserRegisterDoc,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatedUserDoc,
  })
  @ApiBearerAuth()
  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(
    @Body() UserPayLoad: UserRegisterDto,
    @UploadedFile() image: FileDTO,
  ) {
    return await this.authService.RegisterAuthService(UserPayLoad, image);
  }

  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDoc,
  })
  @HttpCode(200)
  @Post()
  async login(@Body() PayLoad: LoginDTO) {
    return await this.authService.LoginAuthService(PayLoad);
  }
}
