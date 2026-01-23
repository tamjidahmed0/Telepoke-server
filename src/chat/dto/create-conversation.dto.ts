import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';



enum ConversationType {
  DIRECT = 'direct',
  GROUP = 'group',
}



export class CreateConversationDto {

  @ApiProperty({
    example: '6973716d12d3c768d7600a2a',
    description: 'Conversation ID',
  })
  @IsMongoId()
  conversationId: string;

  @ApiProperty({
    example: '69736f6512d3c768d7600a27',
    description: 'Other participant user ID',
  })
  @IsMongoId()
  receiver_id: string;

  @ApiProperty({
    example: ConversationType.DIRECT,
    enum: ConversationType,
    description: 'Conversation type',
  })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiProperty({
    example: 'jahid',
    description: 'Display name for conversation',
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    example: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    required: false,
    nullable: true,
    description: 'Display image (optional)',
  })
  @IsOptional()
  @IsString()
  displayImage?: string;

  @ApiProperty({
    example: 'eito valo...tor?',
    required: false,
    nullable: true,
    description: 'Last message text',
  })
  @IsOptional()
  @IsString()
  lastMessageText?: string;

  @ApiProperty({
    example: '2026-01-23T13:17:18.110Z',
    description: 'Last message time',
  })
  @IsDateString()
  lastMessageAt: string;

  @ApiProperty({
    example: 3,
    description: 'Unread message count for current user',
  })
  @IsNumber()
  unreadCount: number;
}

