import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JewelryModule } from './jewelry/jewelry.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    AuthModule,
    JewelryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
