import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './gateways/chat.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { DeliveryService } from './services/delivery.service';
import { TypingGateway } from './gateways/typing.gateway';
import { HeartbeatGateway } from './gateways/heartbeat.gateway';
import { Message, MessageSchema } from './schemas/message.schema';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { ConversationService } from './services/conversation.service';
import { ConversationController } from './controllers/conversation.controller';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';


@Module({
  imports: [RedisModule, FirebaseModule, MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Message.name, schema: MessageSchema },
    { name: Conversation.name, schema: ConversationSchema }
  ])],
  controllers: [ChatController, ConversationController, MessageController],
  providers: [ChatService, ChatGateway, DeliveryService, TypingGateway, HeartbeatGateway, ConversationService, MessageService],
  exports: [ChatGateway, DeliveryService]
})
export class ChatModule { }
