import { Base } from '@/models'
import { RoleModel } from '@/models'
import { ProfileModel } from '@/models'

export interface UserModel extends Base {
    email: string
    isActive: boolean
    roleId: number
    profileId: number
    readonly role?: RoleModel
    readonly profile?: ProfileModel
}

export function createUser(): UserModel {
    return {
        createdAt: '',
        createdBy: 0,
        deleted: false,
        deletedAt: '',
        deletedBy: 0,
        id: 0,
        email: '',
        isActive: false,
        roleId: 0,
        profileId: 0
    }
}
