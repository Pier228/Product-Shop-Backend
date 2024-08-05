import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/models/userSchema';
import { JwtModule } from '@nestjs/jwt';
import { Profile, ProfileSchema } from './models/profileSchema';

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
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
