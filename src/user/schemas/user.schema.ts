import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ default: '' })
  phoneNumber?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  userName?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' })
  profilePhotoUrl?: string;

  @Prop({ default: '' })
  about?: string;

  @Prop({ type: Date, default: null })
  lastSeen?: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  blockedUsers?: Types.ObjectId[];

  @Prop({ default: '' })
  FCMtoken: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// keep updatedAt in sync automatically
UserSchema.pre('save', async function (next) {
  this.updatedAt = new Date();

  next();
});
