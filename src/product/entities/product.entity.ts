import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productId: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.WINE,
  })
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, { cascade: true })
  supplier: Supplier;
}
