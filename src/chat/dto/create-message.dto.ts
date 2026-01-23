import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: '64f1abc123' })
  @IsString()
  conversation_id: string;

  @ApiProperty({ example: '64f1abc456' })
  @IsString()
  sender_id: string;

  @ApiProperty({ example: '64f1abc789' })
  @IsString()
  receiver_id: string;

  @ApiProperty({ example: 'TEXT', enum: ['TEXT', 'IMAGE', 'VIDEO'] })
  @IsEnum(['TEXT', 'IMAGE', 'VIDEO', 'FILE'])
  messageType: string;

  @ApiProperty({ example: 'Hello!', required: false, nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({ example: null, required: false, nullable: true })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiProperty({ example: null, required: false, nullable: true })
  @IsOptional()
  @IsString()
  replyTo?: string;

  @ApiProperty({ example: 'seen', enum: ['sent', 'delivered', 'seen'] })
  @IsOptional()
  @IsEnum(['sent', 'delivered', 'seen'])
  status?: string;

  @ApiProperty({ example: '2023-09-01T12:34:56.789Z' })
  @IsString()
  time: string;
}
