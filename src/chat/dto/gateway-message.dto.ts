import { IsEnum, IsOptional, IsString } from "class-validator";

export class GatewayMessageDto {

    @IsString()
    receiver_id: string;

    @IsEnum(['TEXT', 'IMAGE', 'VIDEO', 'FILE'])
    messageType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE';

    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    mediaUrl?: string;

    @IsOptional()
    @IsString()
    replyTo?: string;
}