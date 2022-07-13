import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async findSupplierBySupplierId(supplierId: string): Promise<Supplier> {
    return await this.supplierRepository.findOneBy({ supplierId: supplierId });
  }
}
