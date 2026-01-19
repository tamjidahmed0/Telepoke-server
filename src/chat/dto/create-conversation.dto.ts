import { IsArray, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsEnum(['direct', 'group'])
  type: 'direct' | 'group';

  @IsArray()
  @IsMongoId({ each: true })
  participants: string[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
