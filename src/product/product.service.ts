import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create({ ...createProductDto });
  }

  findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  findOne(id: number) {
    return this.productModel.findByPk(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto, id);
    await this.productModel.update(
      { ...updateProductDto },
      {
        where: { id: id },
      },
    );
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
