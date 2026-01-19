import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { ChatModule } from './chat/chat.module';
import { RedisModule } from './redis/redis.module';
import { NotificationModule } from './notification/notification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/telepoke'),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets'),
      serveRoot: '/assets'
    
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    FirebaseModule,
    ChatModule,
    RedisModule,
    NotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
