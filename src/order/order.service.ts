import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/auth/models/profileSchema';
import { CreateOrderDTO } from './dto/create.order.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Order } from './model/order.schema';
import { AuthService } from 'src/auth/auth.service';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Profile.name, 'profiles') private profileModel: Model<Profile>,
    @InjectModel(Order.name, 'orders') private orderModel: Model<Order>,
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
  ) {}

  async makeOrder(token: string, orderData: CreateOrderDTO) {
    try {
      let { email, cart } = await this.profileService.getProfile(token);
      let { id } = await this.authService.verifyToken(token);

      if (cart.length < 1) {
        throw new NotFoundException('Cart is empty');
      }

      let order = await this.orderModel.create({
        userId: id,
        email,
        order: cart,
        contactData: orderData,
      });

      if (!order) {
        throw new BadRequestException('Cannot create order');
      }

      await this.clearCart(id);

      await this.addOrderHistory(id, order);

      await this.orderNotification(order);

      return { message: 'Order successfully created!' };
    } catch (error) {
      throw error;
    }
  }

  private async clearCart(id: string) {
    try {
      let response = await this.profileModel.findOneAndUpdate(
        { id },
        {
          cart: [],
        },
      );

      if (!response) {
        throw new NotFoundException(`Cannot find profile with this id`);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  private async addOrderHistory(id: string, orderData) {
    let { order, contactData, _id } = orderData;

    try {
      let response = await this.profileModel.findOneAndUpdate(
        { id },
        {
          $push: { orderHistory: { order, contactData, id: _id } },
        },
      );
      if (!response) {
        throw new NotFoundException(`Cannot find profile with this id`);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  private async orderNotification(orderData) {
    try {
      const date = new Date();
      const price = orderData.order.reduce(
        (sum, value) => sum + value.price,
        0,
      );
      const mailerSend = new MailerSend({
        apiKey: process.env.EMAIL_API_KEY,
      });

      const sentFrom = new Sender(process.env.EMAIL.toString(), 'Product shop');

      const recipients = [
        new Recipient(
          orderData.email,
          `Dear ${orderData.contactData.name} ${orderData.contactData.middleName}`,
        ),
      ];

      const personalization = [
        {
          email: orderData.email,
          data: {
            id: `${orderData._id}`,
            date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            price: price,
            address: orderData.contactData.address,
            payment: orderData.contactData.payment,
            support_email: 'product.shop@gmail.com',
          },
        },
      ];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject('Order notification')
        .setTemplateId(process.env.EMAIL_TEMPLATE_ID)
        .setPersonalization(personalization);

      let response = await mailerSend.email.send(emailParams);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
