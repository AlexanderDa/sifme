import Service, { formatData } from '@/services/Service'
import { HttpResponse } from '@/services/Service'
import { Http } from '@/services/Service'
import { api } from '@/services/Service'
import { Filter } from '@/utils/query'
import { Where } from '@/utils/query'
import { ProfileModel } from '@/models'

class ProfileService implements Service<ProfileModel> {
    /**
     * Create a new profile record.
     * @param profile profile to create
     */
    async create(profile: Partial<ProfileModel>): Promise<ProfileModel> {
        const res: HttpResponse = await Http.post(api('/profile'), formatData(profile))
        const data: ProfileModel = res.json()
        return data
    }
    /**
     * Count profile records.
     * @param where search filter
     */
    async count(where?: Where<ProfileModel>): Promise<number> {
        const res: HttpResponse = await Http.get(api('/profiles/count', { where }))
        const data = await res.json()
        return data.count
    }

    /**
     * Search profile records.
     * @param filter search filter
     */
    async find(filter?: Filter<ProfileModel>): Promise<ProfileModel[]> {
        const res: HttpResponse = await Http.get(api('/profiles', { filter }))
        const data: ProfileModel[] = await res.json()
        return data
    }

    /**
     * Search for a specific profile record.
     * @param id registration code
     */
    async findById(id: number, filter?: Filter<ProfileModel>): Promise<ProfileModel> {
        const res: HttpResponse = await Http.get(api('/profile', { id, filter }))
        const data: ProfileModel = await res.json()
        return data
    }

    /**
     * Search for a profile record from an user.
     * @param id user registration code
     */
    async findFromUserId(
        id: number,
        filter?: Filter<ProfileModel>
    ): Promise<ProfileModel> {
        const res: HttpResponse = await Http.get(api('/profile/user', { id, filter }))
        const data: ProfileModel = await res.json()
        return data
    }
    /**
     * Update a specific profile record.
     * @param id registration code
     * @param profile profile to update
     */
    async updateById(id: number, profile: Partial<ProfileModel>): Promise<boolean> {
        const res: HttpResponse = await Http.patch(
            api('/profile', { id }),
            formatData(profile)
        )
        return res.status === 204
    }

    /**
     * Replace a specific profile record.
     * @param id registration code
     * @param profile profile to update
     */
    async replaceById(id: number, profile: ProfileModel): Promise<boolean> {
        const res: HttpResponse = await Http.put(api('/profile', { id }), profile)
        return res.status === 204
    }

    /**
     * Delete a specific profile record.
     * @param id
     */
    async deleteById(id: number): Promise<boolean> {
        const res: HttpResponse = await Http.delete(api('/profile', { id }))
        return res.status === 204
    }
}

export default new ProfileService()
