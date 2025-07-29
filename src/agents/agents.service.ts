import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent) private agentRepo: Repository<Agent>,
    private usersService: UsersService,
  ) {}

  async createAgent(name: string, salesRepId: number) {
    const salesRep = await this.usersService.findSalesRepById(salesRepId);
    if (!salesRep) throw new NotFoundException('Sales Rep not found');

    const agent = this.agentRepo.create({ name, salesRep });
    return this.agentRepo.save(agent);
  }

  async getAgentsBySalesRep(salesRepId: number) {
    return this.agentRepo.find({
      where: { salesRep: { id: salesRepId } },
      relations: ['salesRep'],
    });
  }

  

 
}