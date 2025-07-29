import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Sale } from './sale.entity';
@Entity()
export class Commission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  beneficiary: User;

  @ManyToOne(() => Sale, { eager: true })
  sale: Sale;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: 'SELF' | 'AGENT';

  @CreateDateColumn()
  createdAt: Date;
}
