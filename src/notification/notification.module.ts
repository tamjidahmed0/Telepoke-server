import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [NotificationController],
  providers: [NotificationService],

})
export class NotificationModule { }
