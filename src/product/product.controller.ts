import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Request } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(201)
  @Post()
  async create(@Req() request: Request, @Body() productDto: ProductDto) {
    return await this.productService.create(productDto);
  }

  @HttpCode(200)
  @Get('/')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
