import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from '../services/conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(
        private readonly conversationService: ConversationService
    ) { }

    @Get(':user_id')
    async getConversation(@Param('user_id') user_id: string) {

        const conversation = await this.conversationService.getConversation(user_id);

        return conversation
    }

}