import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  quantity?: number;
  userId?: number;
  productId?: number;
  price?: number;
}
