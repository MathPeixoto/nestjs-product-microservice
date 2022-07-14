import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    const product = await this.productRepository.findOneBy({ productId });
    if (product) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `ProductId ${product.productId} already exists`,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.productRepository.save(newProduct);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        supplier: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        supplier: true,
      },
    });

    if (product) {
      return product;
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Product ${id} could not be found`,
        error: 'Not found',
      },
      HttpStatus.NOT_FOUND,
    );
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
