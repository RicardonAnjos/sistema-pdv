import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price } = createProductDto;
    const product = await this.productRepository.save({
      name,
      description,
      price,
    });
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { name, description, price } = updateProductDto;

    const productToUpdate = await this.productRepository.findOne({
      where: { id },
    });

    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.price = price;

    const updatedProduct = await this.productRepository.save(productToUpdate);
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const productToRemove = await this.productRepository.findOne({
      where: { id },
    });

    await this.productRepository.remove(productToRemove);
  }
}
