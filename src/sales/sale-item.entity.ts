import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sale } from './sale.entity';


@Entity()
export class SaleItem {
   @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, sale => sale.items)
  sale: Sale;

  @Column()
  productName: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerUnit: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
