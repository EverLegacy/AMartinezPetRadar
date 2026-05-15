import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
export declare class EmailService {
    private transporter;
    sendEmail(options: EmailOptions): Promise<Boolean>;
}
