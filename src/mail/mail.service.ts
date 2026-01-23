import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';


@Injectable()
export class MailService {

    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('SMTP_HOST'),
            port: this.configService.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
        });
    }



    async sendMail(
        to: string,
        subject: string,
        templateName?: string,
        context?: Record<string, any>,
    ) {
        let html: string | undefined;

        if (templateName) {

            const templatePath = path.join(process.cwd(), 'src', 'mail', 'templates', `${templateName}.html`);
            const source = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(source);
            html = template(context || {});
        }

        const info = await this.transporter.sendMail({
            from: `"TelePoke" <${this.configService.get<string>('SMTP_USER')}>`,
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return info;
    }

}
