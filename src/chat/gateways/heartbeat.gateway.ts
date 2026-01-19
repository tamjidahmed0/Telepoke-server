import { WebSocketGateway, MessageBody, SubscribeMessage, ConnectedSocket } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { RedisService } from "src/redis/redis.service";

@WebSocketGateway({ cors: { origin: '*' } })
export class HeartbeatGateway {

    constructor(
        private readonly redisService: RedisService
    ) { }


    @SubscribeMessage('heartbeat')
    async handleHeartbeat(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        const socketId = data.socket;
        const userData = { socketId: client.id };
        await this.redisService.addOnlineUser(socketId, userData);
    }


}
