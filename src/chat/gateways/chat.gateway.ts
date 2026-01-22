import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ConversationService } from '../services/conversation.service';
import { GatewayMessageDto } from '../dto/gateway-message.dto';


@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {

    @WebSocketServer()
    server: Server;


    constructor(
        private readonly redisService: RedisService,
        private readonly firebaseService: FirebaseService,
        private readonly conversationService: ConversationService
    ) { }



    //When new user connected
    async handleConnection(client: Socket) {
        console.log('A user connected', client.id);
        await this.redisService.addOnlineUser(client.handshake.query.id as string, { user_Id: client.handshake.query.id, socket: client.id });

    }




    // 1 to 1 message 
    @SubscribeMessage('received-message')
    async handleMessage(
        @MessageBody() data: GatewayMessageDto,
        @ConnectedSocket() client: Socket
    ) {
        // console.log('Message received:', data);
        const user = await this.redisService.getOnlineUser(data.receiver_id);

        const sender_id = client.handshake.query.id;

        if (!sender_id || Array.isArray(sender_id)) {
            console.error('Invalid sender ID in socket handshake');
            return;
        }

        console.log(user, 'user')
        console.log(data, 'data')


        const message = await this.conversationService.createConversation({
            sender_id: sender_id,
            receiver_id: data.receiver_id,
            messageType: data.messageType,
            text: data.text,
            replyTo: data.replyTo
        })


        if (Object.keys(user).length === 0) {


            await this.firebaseService.sendNotification({
                receiver_id: data.receiver_id,
                sender_id: sender_id,
                body: data.text,
                message_id: message._id.toString()

            });

        } else {
            client.to(user.socket).emit('received-message', { ...data, type: 'received' });
        }


        client.emit('sent-message', { ...data, type: 'sent' })



    }




    //When user disconnect or Offline.
    async handleDisconnect(client: Socket) {
        console.log('User disconnected:', client.handshake.query.id);
        await this.redisService.removeOnlineUser(client.handshake.query.id as string)
    }




}
