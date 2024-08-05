import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/model/order.schema';
import { AddProductToCartDTO } from 'src/profile/dto/add.product.to.cart.dto';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ default: [] })
  cart: AddProductToCartDTO[];

  @Prop({ default: [] })
  orderHistory: Partial<Order>[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
