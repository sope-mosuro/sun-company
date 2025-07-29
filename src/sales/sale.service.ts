import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { SaleItem } from './sale-item.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { User } from '../users/user.entity';
import { Commission } from './commission.entity';
import { Agent } from 'src/agents/agent.entity';

@Injectable()
export class SaleService{
    constructor(
        @InjectRepository(Sale) private saleRepo: Repository<Sale>,
        @InjectRepository(SaleItem) private saleItemRepo: Repository<SaleItem>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Agent) private agentRepo: Repository<Agent>,
        @InjectRepository(Commission) private commissionRepo: Repository<Commission>,
    ) {}

    async createSale(dto: CreateSaleDto, salesRepId: number) {
  const salesRep = await this.userRepo.findOneBy({ id: salesRepId });
  const agent = dto.agentId ? await this.agentRepo.findOneBy({ id: dto.agentId }) : null;

  const items: SaleItem[] = [];
  let totalAmount = 0;

  for (const itemDto of dto.items) {
    const total = itemDto.pricePerUnit * itemDto.quantity;
    totalAmount += total;

    const item = this.saleItemRepo.create({
      productName: itemDto.productName,
      quantity: itemDto.quantity,
      pricePerUnit: itemDto.pricePerUnit,
      total,
    });
    items.push(item);
  }

  const sale = this.saleRepo.create({
    salesRep,
    ...(agent ? { agent } : {}),
    items,
    amount: totalAmount,
    description: dto.description,
  }as Partial<Sale>);

  const savedSale = await this.saleRepo.save(sale);

  // Commission logic
 const selfCommission = totalAmount * 0.10;
if (salesRep) {
  await this.commissionRepo.save({
    sale: savedSale,
    beneficiary: salesRep,
    amount: selfCommission,
    type: 'SELF',
  });
}

if (agent) {
  const agentCommission = totalAmount * 0.05;
  await this.commissionRepo.save({
    sale: savedSale,
    beneficiary: agent, 
    amount: agentCommission,
    type: 'AGENT',
  });
}

  return savedSale;
}

}