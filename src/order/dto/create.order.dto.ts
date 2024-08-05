import {
  IsAlpha,
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { PaymentOptions } from './payment.options';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'The phone number of the customer',
    example: '+380931029821',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  phoneNumber: string;

  @ApiProperty({
    description: 'The name of the customer',
    example: 'John',
  })
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty({
    description: 'The surname of the customer',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsAlpha()
  surname: string;

  @ApiProperty({
    description: 'The middle name of the customer',
    example: 'Alexanderov',
  })
  @IsNotEmpty()
  @IsAlpha()
  middleName: string;

  @ApiProperty({
    description: 'The address where the order will be delivered',
    example: '123 Main St, Kyiv, Ukraine',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The payment option selected by the customer',
    example: 'Card',
    enum: PaymentOptions,
  })
  @IsNotEmpty()
  @IsEnum(PaymentOptions)
  payment: PaymentOptions;
}
