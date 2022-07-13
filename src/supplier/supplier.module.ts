import { Module } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { SupplierService } from './supplier.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
