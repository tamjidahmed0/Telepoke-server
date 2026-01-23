import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageService } from '../services/message.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) { }



    @ApiOperation({ summary: 'Get messages of a conversation' })
    @ApiResponse({
        status: 201,
        description: 'Messages retrieved successfully',
        type: CreateMessageDto,
        isArray: true
    })

    @Get(':conversation_id/:user_id')
    @HttpCode(201)
    async getMessages(
        @Param('conversation_id') conversation_id: string,
        @Param('user_id') user_id: string,
    ) {

        return await this.messageService.getMessages(conversation_id, user_id);


    }




}
