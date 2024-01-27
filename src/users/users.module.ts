import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, UserEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
