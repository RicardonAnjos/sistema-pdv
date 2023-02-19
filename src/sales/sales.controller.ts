import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    const sales = await this.salesService.findAll();

    if (sales.length === 0 || !sales) {
      throw new NotFoundException('No sales found');
    }

    return sales;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const saleId = await this.salesService.findOne(+id);

    if (!saleId) {
      throw new NotFoundException('Sale not found');
    }

    return saleId;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
