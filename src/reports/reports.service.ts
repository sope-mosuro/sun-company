import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../sales/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
  ) {}

  async getSalesRanking({ startDate, endDate }: { startDate?: Date; endDate?: Date }) {
    const qb = this.saleRepo.createQueryBuilder('sale')
      .leftJoin('sale.salesRep', 'salesRep');

    if (startDate) {
      qb.andWhere('sale.createdAt >= :startDate', { startDate });
    }
    if (endDate) {
      qb.andWhere('sale.createdAt <= :endDate', { endDate });
    }

    // Aggregate by salesRep (relation)
    const salesRepResults = await qb.clone()
      .select([
        'salesRep.id AS id',
        'salesRep.name AS name',
        "'sales_rep' AS role",
        'SUM(sale.amount) AS totalSales',
      ])
      .where('salesRep.id IS NOT NULL')
      .groupBy('salesRep.id')
      .addGroupBy('salesRep.name')
      .orderBy('totalSales', 'DESC')
      .getRawMany();

    // Aggregate by agent (string field on Sale)
    const agentResults = await qb.clone()
      .select([
        'sale.agent AS id', // use agent string as "id"
        'sale.agent AS name',
        "'agent' AS role",
        'SUM(sale.amount) AS totalSales',
      ])
      .where('sale.agent IS NOT NULL')
      .groupBy('sale.agent')
      .orderBy('totalSales', 'DESC')
      .getRawMany();

    // Merge and sort
    return [...salesRepResults, ...agentResults].sort(
      (a, b) => Number(b.totalSales) - Number(a.totalSales),
    );
  }
}
