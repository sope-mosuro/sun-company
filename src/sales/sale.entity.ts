import { Entity, PrimaryGeneratedColumn, Column, ManyToOne , CreateDateColumn,OneToMany} from 'typeorm';
import { User } from '../users/user.entity';
import { SaleItem } from './sale-item.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.salesRepSales)
  salesRep: User;

  @ManyToOne(() => User, { nullable: true })
  agent: User;

  @CreateDateColumn()
  createdAt: Date;

 @OneToMany(() => SaleItem, item => item.sale, { cascade: true, eager: true })
  items: SaleItem[];

}
