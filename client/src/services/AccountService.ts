import { Http } from '@/services/Service'
import { HttpResponse } from '@/services/Service'
import { api } from '@/services/Service'

class AccountService {
    async login(email: string, password: string): Promise<string> {
        const res: HttpResponse = await Http.post(api('/account/login'), {
            email,
            password
        })
        const data = await res.json()
        return `Bearer ${data.token}`
    }
    // eslint-disable-next-line
    async me(): Promise<any> {
        const res: HttpResponse = await Http.get(api('/account/me'))
        return res.json()
    }
}

export default new AccountService()
