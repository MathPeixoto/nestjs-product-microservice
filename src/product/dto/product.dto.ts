import { Category } from '../entities/category.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

export class ProductDto {
  id: number;
  productId: string;
  name: string;
  price: number;
  category: Category;
  supplier: Supplier;
}
