import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from '../services/conversation.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateConversationDto } from '../dto/create-conversation.dto';

@Controller('conversation')
export class ConversationController {
    constructor(
        private readonly conversationService: ConversationService
    ) { }


    @ApiOperation({ summary: 'Get conversation' })
    @ApiResponse({
        status: 201,
        description: 'Conversation retrieved successfully',
        type: CreateConversationDto,
        isArray: true
    })
    @Get(':user_id')
    async getConversation(@Param('user_id') user_id: string) {

        const conversation = await this.conversationService.getConversation(user_id);

        return conversation
    }

}