import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CreateProductDTO } from 'src/products/dto/create.product.dto';
import { AddProductToCartDTO } from 'src/profile/dto/add.product.to.cart.dto';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  order: AddProductToCartDTO[];

  @Prop({ required: true })
  contactData: CreateProductDTO;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
