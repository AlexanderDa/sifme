import * as nodemailer from 'nodemailer';
import {resolve} from 'path';
import {renderFile} from 'ejs';
import {SERVER} from '../configs';
import {EMAIL} from '../configs';
import {appInfo} from '../utils';

export interface EmailService {
  /**
   * Send the welcome email with the account activation code.
   * @param name username
   * @param email email to send
   * @param confirmationCode code to validate account
   */
  welcome(name: string, email: string, confirmationCode: string): Promise<void>;
}

export class MyEmailService implements EmailService {
  private transporter = nodemailer.createTransport({
    host: EMAIL.smptHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: EMAIL.address,
      pass: EMAIL.password,
    },
  });

  private emailPath(name: string): string {
    return resolve(__dirname, '../../public/email/', name);
  }

  async welcome(
    name: string,
    email: string,
    confirmationCode: string,
  ): Promise<void> {
    if (EMAIL.isSupported()) {
      const mailOptions = {
        from: `${appInfo.name} <${EMAIL.address}>`,
        to: email,
        subject: 'Bienvenido',
        html: await renderFile(this.emailPath('welcome.ejs'), {
          appUrl: SERVER.domain,
          name: name,
          query: JSON.stringify({
            userName: name,
            activationCode: confirmationCode,
            emailAddress: email,
          }),
        }),
      };

      await this.transporter.sendMail(mailOptions);
    }
  }
}
