import { HttpResponse } from '@/services/Service'
import { Http } from '@/services/Service'
import { api } from '@/services/Service'
import { ProfileModel } from '@/models'

class UserRelationService {
    /**
     * Find profile of a user.
     * @param userId
     */
    async profileOfUser(userId: number): Promise<ProfileModel> {
        const res: HttpResponse = await Http.get(api(`/user/${userId}/profile`))
        const data: ProfileModel = await res.json()
        return data
    }
}

export default new UserRelationService()
