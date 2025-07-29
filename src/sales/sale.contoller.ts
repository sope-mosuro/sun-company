import { Controller } from '@nestjs/common';
import { SaleService } from './sale.service';
import {
  Post,
  Body,
 
  Request,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';


@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

 @Post()
  async createSale(@Body() dto: CreateSaleDto, @CurrentUser() user: { userId: number }) { 
    const sale = await this.saleService.createSale(dto, user.userId);
    return {
      message: 'Sale recorded successfully',
      sale,
    };
}
}