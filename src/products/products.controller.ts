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

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    if (!products) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productId = await this.productsService.findOne(+id);

    if (!productId) {
      throw new NotFoundException('Product not found');
    }

    return productId;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const productToRemove = await this.productsService.remove(+id);

    return productToRemove;
  }
}
