import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from '../schemas/conversation.schema';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';


interface PopulatedUser {
    _id: string;
    name: string;
    profilePhotoUrl: string;
}


@Injectable()
export class ConversationService {

    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) { }

    async createConversation({ sender_id, receiver_id, text, messageType , replyTo}: { sender_id: string, receiver_id: string, text: string, messageType: string , replyTo?: string}) {

        let conversation = await this.conversationModel.findOne({
            type: 'direct',
            participants: { $all: [sender_id, receiver_id], $size: 2 },
        });



        //  Create conversation if not exists
        if (!conversation) {
            conversation = await this.conversationModel.create({
                type: 'direct',
                participants: [sender_id, receiver_id],
                unreadCount: {
                    [sender_id]: 0,
                    [receiver_id]: 1,
                },
                lastMessageText: text,
                lastMessageSender: sender_id,
            });
        }


        const message = await this.messageModel.create({
            conversation_id: conversation._id,
            sender_id,
            receiver_id,
            messageType,
            text,
            replyTo
        });


        // Update conversation with latest message info
        await this.conversationModel.findByIdAndUpdate(conversation._id, {
            lastMessage: message._id,
            lastMessageText: text,
            lastMessageSender: sender_id,
            lastMessageAt: message.time,
            $inc: { [`unreadCount.${receiver_id}`]: 1 },
        });

        return message;




    }




    async getConversation(user_id: string) {


        const conversations = await this.conversationModel
            .find({ participants: user_id, deletedFor: { $ne: user_id } })
            .populate('participants', 'name profilePhotoUrl')
            .sort({ updatedAt: -1 })
            .lean();

          



        return conversations.map(conv => {
            let displayName = conv.name || '';
            let displayImage = conv.profileImage || '';

            if (conv.type === 'direct') {
                // Type assertion: participants as PopulatedUser[]
                const otherUser = (conv.participants as unknown as PopulatedUser[]).find(
                    (p) => p._id.toString() !== user_id,
                );
                if (otherUser) {
                    displayName = otherUser.name;
                    displayImage = otherUser.profilePhotoUrl;
                }
            }


            // lastMessageText display logic
            let lastMessageText = conv.lastMessageText || '';
            if (conv.lastMessageSender?.toString() === user_id) {
                lastMessageText = `You: ${lastMessageText}`;

            }



            return {
                conversationId: conv._id,
                receiver_id: conv.participants.find((item) => item._id.toString() !== user_id)?._id ,
                type: conv.type,
                displayName,
                displayImage,
                lastMessageText: lastMessageText,
                lastMessageAt: conv.lastMessageAt,
                unreadCount: conv.unreadCount?.[user_id] || 0,
    
            };
        });
    }



}
