import { Http } from '@/services/Service'
import { api } from '@/services/Service'

class EmailService {
    /**
     * Send email to activate an account.
     * @param email
     */
    async welcome(email: string): Promise<void> {
        await Http.post(api('/email/welcome'), { email })
    }
}

export default new EmailService()
