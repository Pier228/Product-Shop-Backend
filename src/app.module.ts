import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/products.module';
import { ProfilesModule } from './profile/profile.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      connectionName: 'auth',
      dbName: 'Auth',
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      connectionName: 'products',
      dbName: `products`,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      connectionName: 'profiles',
      dbName: `Profiles`,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT, {
      connectionName: 'orders',
      dbName: `Orders`,
    }),
    AuthModule,
    ProductModule,
    ProfilesModule,
    OrderModule,
  ],
})
export class AppModule {}
