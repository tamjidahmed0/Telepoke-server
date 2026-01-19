import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {

    @Prop({ required: true })
    conversation_id: Types.ObjectId;

    @Prop({ required: true })
    sender_id: string;

    @Prop({ required: true })
    receiver_id: string;

    @Prop({ required: true, enum: ['TEXT', 'IMAGE', 'Video', 'FILE'] })
    messageType: string;

    @Prop()
    text?: string;

    @Prop()
    mediaUrl?: string;

    @Prop({ type: Types.ObjectId, ref: 'Message', required: false })
    replyTo?: Types.ObjectId;


    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    deletedFor: Types.ObjectId[];

    @Prop({ default: 'sent', enum: ['sent', 'delivered', 'seen'] })
    status: string;

    @Prop({ default: () => new Date().toISOString() })
    time: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
