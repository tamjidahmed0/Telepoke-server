import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model, Types } from 'mongoose';


@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) { }



    async getMessages(conversation_id: string, user_id: string) {

        const messages = await this.messageModel
            .find({
                conversation_id: new Types.ObjectId(conversation_id),
                deletedFor: { $ne: user_id },
                $or: [
                    { sender_id: user_id },
                    { receiver_id: user_id }
                ]
            })
            .sort({ createdAt: 1 })
            .lean();



        const filter_messages = messages.map(msg => ({
            _id: msg._id,
            sender_id: msg.sender_id,
            receiver_id: msg.receiver_id,
            text: msg.text,
            messageType: msg.messageType,
            mediaUrl: msg.mediaUrl,
            status: msg.status,
            time: msg.time,
            type: msg.sender_id === user_id ? 'RECEIVED' : 'SENT', // frontend easily know who sent
            replyTo: msg.replyTo
        }));


        return filter_messages;



    }

}
