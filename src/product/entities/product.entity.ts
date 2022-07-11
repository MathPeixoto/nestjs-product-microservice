import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column
  productId: string;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  category: string;

  @Column
  supplier: string;
}
