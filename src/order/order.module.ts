import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/auth/models/profileSchema';
import { ProfilesModule } from 'src/profile/profile.module';
import { Order, OrderSchema } from './model/order.schema';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
    MongooseModule.forFeature(
      [{ name: Profile.name, schema: ProfileSchema, collection: 'profiles' }],
      'profiles',
    ),
    MongooseModule.forFeature(
      [{ name: Order.name, schema: OrderSchema, collection: 'orders' }],
      'orders',
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
