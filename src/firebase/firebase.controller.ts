import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {

    constructor(private readonly fcmService: FirebaseService) { }

    @Post('send')
    async sendNotification(
        @Body('email') email: string,
        @Body('title') title: string,
        @Body('body') body: string,
        @Body('data') data: object,
    ) {
        // return this.fcmService.sendNotification(email, title, body, data);
    }

}
