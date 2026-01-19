import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {

  @IsString()
  conversation_id: string;

  @IsString()
  sender_id: string;

  @IsString()
  receiver_id: string;

  @IsEnum(['TEXT', 'IMAGE', 'VIDEO', 'FILE'])
  messageType: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @IsOptional()
  @IsString()
  replyTo?: string;

  @IsOptional()
  deletedFor?: string[];

  @IsOptional()
  @IsEnum(['sent', 'delivered', 'seen'])
  status?: string;
}
