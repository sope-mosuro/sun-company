import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@Controller('agents')
@UseGuards(RolesGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post('create')
  @Roles('admin', 'sales_rep')
  async createAgent(@Body('name') name: string, @Request() req) {
    const salesRepId = req.user.id;
    return this.agentsService.createAgent(name, salesRepId);
  }

   @Get('by-rep/:id')
  @Roles('admin', 'sales_rep')
  async getAgentsBySalesRep(@Param('id') repId: number) {
    return this.agentsService.getAgentsBySalesRep(repId);
  }
  
  @Get('my-agents')
async getMyAgents(@CurrentUser() user: { id: number }) {
  return this.agentsService.getAgentsBySalesRep(user.id);
}

}