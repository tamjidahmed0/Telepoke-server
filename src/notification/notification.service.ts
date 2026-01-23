import { Injectable } from '@nestjs/common';
import { DeliveryService } from 'src/chat/services/delivery.service';


@Injectable()
export class NotificationService {
    constructor(
        private readonly deliveryService: DeliveryService
    ) { }


    async markAsDelivered(deliveredDto: { sender_id: string, receiver_id: string , message_id : string}) {
        this.deliveryService.sendDeliveredStatus(deliveredDto);
    }
}
