import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agent } from '../agents/agent.entity';
import { Sale } from '../sales/sale.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_REP = 'SALES_REP',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => Agent, (agent) => agent.salesRep)
  agents: Agent[];

  @OneToMany(() => Sale, (sale) => sale.salesRep)
  salesRepSales: Sale[];

  @OneToMany(() => Sale, (sale) => sale.agent)
  agentSales: Sale[];
}
