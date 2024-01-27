import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './jwt/jwt.config';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import { UserEntity } from '../database/entities';



@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtOptions, global: true }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}