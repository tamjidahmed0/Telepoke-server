import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('delivered')
    async markAsDelivered(@Body() deliverdDto: { sender_id: string, receiver_id: string, message_id: string }) {
        await this.notificationService.markAsDelivered(deliverdDto);

    }

}
