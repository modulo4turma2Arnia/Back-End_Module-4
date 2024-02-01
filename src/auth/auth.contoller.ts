import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/files.dto';
import { UserRegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(
    @Body() PayLoad: UserRegisterDto,
    @UploadedFile() file: FileDTO,
  ) {
    return await this.authService.RegisterAuthService(PayLoad, file);
  }

  @HttpCode(200)
  @Post()
  async login(@Body() PayLoad: LoginDTO) {
    return await this.authService.LoginAuthService(PayLoad);
  }
}
