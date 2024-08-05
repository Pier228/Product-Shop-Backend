import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/models/userSchema';
import { Profile, ProfileSchema } from 'src/auth/models/profileSchema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema, collection: 'users' }],
      'auth',
    ),
    MongooseModule.forFeature(
      [{ name: Profile.name, schema: ProfileSchema, collection: 'profiles' }],
      'profiles',
    ),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports:[ProfileService]
})
export class ProfilesModule {}
