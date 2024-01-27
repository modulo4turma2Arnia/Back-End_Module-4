import { Module } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { JewelryController } from './jewelry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelryEntity } from 'src/database/entities';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([JewelryEntity]), 
  UsersModule
],
  controllers: [JewelryController],
  providers: [JewelryService],
})
export class JewelryModule {}
