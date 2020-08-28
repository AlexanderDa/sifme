import { Http } from '@/services/Service'
import { HttpResponse } from '@/services/Service'
import { api } from '@/services/Service'
import { UserModel } from '@/models'

class AccountService {
    async login(email: string, password: string)
        : Promise<{ token: string; duration: number }> {
        const res: HttpResponse = await Http.post(api('/account/login'), {
            email,
            password
        })
        let data = await res.json()
        data.token = `Bearer ${data.token}`

        return data
    }

    async me(): Promise<UserModel> {
        const res: HttpResponse = await Http.get(api('/account/me'))
        return res.json()
    }

    async activate(email: string, password: string, verificationToken: string)
    : Promise<{ token: string; duration: number }> {
        const res: HttpResponse = await Http.post(api('/account/activate'), {
            email,
            password,
            verificationToken
        })
        let data = await res.json()
        data.token = `Bearer ${data.token}`

        return data
    }
}

export default new AccountService()
