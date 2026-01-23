import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import { RedisModule } from 'src/redis/redis.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports : [RedisModule, MailModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
