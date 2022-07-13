import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

import { SupplierService } from '../supplier/supplier.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private supplierService: SupplierService,
  ) {}

  async create(productDto: ProductDto): Promise<Product> {
    const { productId, name, price, supplier, category } = productDto;

    const newProduct = new Product();
    newProduct.productId = productId;
    newProduct.name = name;
    newProduct.price = price;
    newProduct.category = category;

    const supplierDatabase =
      await this.supplierService.findSupplierBySupplierId(supplier.supplierId);
    if (supplierDatabase) {
      newProduct.supplier = supplierDatabase;
    } else {
      newProduct.supplier = supplier;
    }

    return await this.productRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id: id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id: id } });

    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  remove(id: number) {
    return this.productRepository.delete({ id: id });
  }
}
