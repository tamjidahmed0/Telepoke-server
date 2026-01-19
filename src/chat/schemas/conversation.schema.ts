import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
    //  direct or group
    @Prop({ type: String, enum: ['direct', 'group'], required: true })
    type: 'direct' | 'group';

    //  all users who are part of this conversation
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
    participants: Types.ObjectId[];

    //  for group chat name or custom title
    @Prop({ type: String, default: '' })
    name?: string;

    //  group profile photo or direct user photo
    @Prop({ type: String, default: '' }) 
    profileImage?: string;

    //  last message summary for showing in inbox list
    @Prop({ type: String, default: '' })
    lastMessageText?: string;

    //  who sent the last message
    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    lastMessageSender?: Types.ObjectId;

    //  when last message was sent
    @Prop({ type: Date, default: null })
    lastMessageAt?: Date;

    //  unread counts per user (like WhatsApp)
    @Prop({ type: Map, of: Number, default: {} })
    unreadCount: Map<string, number>; // key = userId, value = count

    //  who deleted this conversation (soft delete)
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    deletedFor: Types.ObjectId[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
