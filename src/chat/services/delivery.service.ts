import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class DeliveryService {
    constructor(
        private readonly chatGateway: ChatGateway,
        private readonly redisService: RedisService
    ) { }


    /*
        It can handle HTTP trigger to socket event
        In frontend for delivery status showing add event the name will be 'delivered'
    */
    async sendDeliveredStatus(delivertDto: { sender_id: string, receiver_id: string, message_id : string }) {
        const user = await this.redisService.getOnlineUser(delivertDto.sender_id);
        if (user && user.socket) {
            console.log(delivertDto)

            this.chatGateway.server.to(user.socket).emit('delivered', { sender_id: delivertDto.sender_id, receiver_id: delivertDto.receiver_id, message_id: delivertDto.message_id });
            console.log('Message delivered successfully')
        }
    }



}