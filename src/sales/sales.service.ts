import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const userRepository = this.saleRepository.manager.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: createSaleDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productRepository =
      this.saleRepository.manager.getRepository(Product);
    const product = await productRepository.findOne({
      where: { id: createSaleDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const sale = this.saleRepository.create({
      price: createSaleDto.price,
      quantity: createSaleDto.quantity,
      userId: user,
      productId: product,
    });

    return this.saleRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.saleRepository.find({
      relations: ['userId', 'productId'],
    });
  }

  async findOne(id: number): Promise<Sale> {
    return await this.saleRepository.findOne({
      where: { id },
      relations: ['userId', 'productId'],
    });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleRepository.findOne({ where: { id } });

    const { userId, productId, price, quantity } = updateSaleDto;

    const updatedUser = Object.assign({}, { id: userId });
    const updatedProduct = Object.assign({}, { id: productId });

    const updatedSale = this.saleRepository.merge(sale, {
      userId: updatedUser,
      productId: updatedProduct,
      price,
      quantity,
    });

    return this.saleRepository.save(updatedSale);
  }

  async remove(id: number): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
