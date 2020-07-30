import * as nodemailer from 'nodemailer'
import { resolve } from 'path'
import { renderFile } from 'ejs'
import { SERVER } from '../configs'
import { EMAIL } from '../configs'
import { appInfo } from '../utils'

interface EmailAccount {
    username: string
    image?: string
    email: string
    verificationToken: string
}

export interface EmailService {
    /**
     * Send the welcome email with the account activation code.
     */
    welcome(config: EmailAccount): Promise<void>
}

export class MyEmailService implements EmailService {
    private transporter = nodemailer.createTransport({
        host: EMAIL.smptHost,
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: EMAIL.address,
            pass: EMAIL.password
        }
    })

    private emailPath(name: string): string {
        return resolve(__dirname, '../../public/email/', name)
    }

    async welcome(config: EmailAccount): Promise<void> {
        if (EMAIL.isSupported()) {
            const mailOptions = {
                from: `${appInfo.name} <${EMAIL.address}>`,
                to: config.email,
                subject: 'Bienvenido',
                html: await renderFile(this.emailPath('welcome.ejs'), {
                    appUrl: SERVER.domain,
                    username: config.username,
                    query: JSON.stringify({
                        username: config.username,
                        image: config.image,
                        verificationToken: config.verificationToken,
                        email: config.email
                    })
                })
            }

            await this.transporter.sendMail(mailOptions)
        }
    }
}
