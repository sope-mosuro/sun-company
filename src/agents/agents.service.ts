import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AgentDto } from './dto/agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent) private agentRepo: Repository<Agent>,
    private usersService: UsersService,
  ) {}

  async createAgent(name: string, salesRepId: number) {
    const salesRep = await this.usersService.findUserById(salesRepId);
    if (!salesRep) throw new NotFoundException('Sales Rep not found');

    const agent = this.agentRepo.create({ name, salesRep });
    return this.agentRepo.save(agent);
  }

  async getAgentsBySalesRep(salesRepId: number): Promise<AgentDto[]> {
  const agents = await this.agentRepo.find({
    where: { salesRep: { id: salesRepId } },
    relations: ['salesRep'],
  });

  return agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    salesRep: {
      id: agent.salesRep.id,
      name: agent.salesRep.name,
    },
  }));
  }

  

 
}