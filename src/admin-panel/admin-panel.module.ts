import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelController } from './admin-panel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/models/userSchema';
import { AuthModule } from 'src/auth/auth.module';
import { Profile, ProfileSchema } from 'src/auth/models/profileSchema';
import { Order, OrderSchema } from 'src/order/model/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema, collection: 'users' }],
      'auth',
    ),
    MongooseModule.forFeature(
      [{ name: Profile.name, schema: ProfileSchema, collection: 'profiles' }],
      'profiles',
    ),
    MongooseModule.forFeature(
      [{ name: Order.name, schema: OrderSchema, collection: 'orders' }],
      'orders',
    ),
    AuthModule,
  ],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
