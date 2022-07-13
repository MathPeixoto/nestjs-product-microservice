import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { SupplierModule } from '../supplier/supplier.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SupplierModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
