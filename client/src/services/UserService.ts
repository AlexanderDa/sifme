import Service from '@/services/Service'
import { HttpResponse } from '@/services/Service'
import { Http } from '@/services/Service'
import { api } from '@/services/Service'
import { Filter } from '@/utils/query'
import { Where } from '@/utils/query'
import { UserModel } from '@/models'

class UserService implements Service<UserModel> {
    /**
     * Create a new user record.
     * @param user user to create
     */
    async create(user: Partial<UserModel>): Promise<UserModel> {
        const res: HttpResponse = await Http.post(
            api('/user/profile', { id: user.profileId }),
            user
        )
        const data: UserModel = res.json()
        return data
    }
    /**
     * Count user records.
     * @param where search filter
     */
    async count(where?: Where<UserModel> | undefined): Promise<number> {
        const res: HttpResponse = await Http.get(api('/users/count', { where }))
        const data = await res.json()
        return data.count
    }

    /**
     * Search user records.
     * @param filter search filter
     */
    async find(filter?: Filter<UserModel>): Promise<UserModel[]> {
        const res: HttpResponse = await Http.get(api('/users', { filter }))
        const data: UserModel[] = await res.json()
        return data
    }

    /**
     * Search for a specific user record.
     * @param id registration code
     * @param filter search filter
     */
    async findById(id: number, filter?: Filter<UserModel>): Promise<UserModel> {
        const res: HttpResponse = await Http.get(api('/user', { id, filter }))
        const data: UserModel = await res.json()
        return data
    }

    /**
     * Search for a specific user record by their profile.
     * @param id profile registration code
     * @param filter search filter
     */
    async findByProfileId(id: number, filter?: Filter<UserModel>): Promise<UserModel> {
        const res: HttpResponse = await Http.get(api('/user/profile', { id, filter }))
        const data: UserModel = await res.json()
        return data
    }

    /**
     * Update a specific user record.
     * @param id registration code
     * @param user user to update
     */
    async updateById(id: number, user: Partial<UserModel>): Promise<boolean> {
        const res: HttpResponse = await Http.patch(api('/user', { id }), user)
        return res.status === 204
    }

    /**
     * Replace a specific user record.
     * @param id registration code
     * @param user user to update
     */
    async replaceById(id: number, user: UserModel): Promise<boolean> {
        const res: HttpResponse = await Http.put(api('/user', { id }), user)
        return res.status === 204
    }

    /**
     * Delete a specific user record.
     * @param id
     */
    async deleteById(id: number): Promise<boolean> {
        const res: HttpResponse = await Http.delete(api('/user', { id }))
        return res.status === 204
    }
}

export default new UserService()
