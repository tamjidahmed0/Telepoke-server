import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }



    async getMessages(conversation_id: string, user_id: string) {

        const messages = await this.messageModel
            .find({
                conversation_id: new Types.ObjectId(conversation_id),
                deletedFor: { $ne: user_id },
            })
            .sort({ createdAt: 1 })
            .lean();

        const user = await this.userModel.findById(user_id);



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



        // return {
        //     messages: filter_messages,
        //     profile: {
        //         name: user?.name,
        //         avatar: user?.profilePhotoUrl
        //     }
        // }

        return filter_messages;
     
      



    }

}
