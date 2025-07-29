import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { SaleService } from './sale.service';
import { SaleController } from './sale.contoller';
import { SaleItem } from './sale-item.entity';
import { User } from '../users/user.entity';
import { Commission } from './commission.entity';
import { Agent } from 'src/agents/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem, User, Commission, Agent])],
  providers: [SaleService],
  controllers: [SaleController],
})
export class SalesModule {}