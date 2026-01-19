import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from '../services/message.service';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) { }


    @Get(':conversation_id/:user_id')
    async getMessages(
        @Param('conversation_id') conversation_id: string,
        @Param('user_id') user_id: string,
    ) {

        return await this.messageService.getMessages(conversation_id, user_id);


    }




}
