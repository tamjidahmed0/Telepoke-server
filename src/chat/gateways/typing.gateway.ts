import { WebSocketGateway, MessageBody, SubscribeMessage, ConnectedSocket } from "@nestjs/websockets";
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class TypingGateway {

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log('Typing:', data);
        // client.emit('user_typing', data);
    }

    @SubscribeMessage('stop_typing')
    handleStopTyping(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        // client.emit('user_stopped_typing', data);
    }



}
