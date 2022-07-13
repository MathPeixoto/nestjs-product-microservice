import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: '' })
  supplierId: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
