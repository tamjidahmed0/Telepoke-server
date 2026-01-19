import { IsMongoId, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateConversationDto {
  @IsOptional()
  @IsString()
  lastMessageText?: string;

  @IsOptional()
  @IsMongoId()
  lastMessageSender?: string;

  @IsOptional()
  @IsDateString()
  lastMessageAt?: Date;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
