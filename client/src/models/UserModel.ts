import { Base } from '@/models'
import { RoleModel } from '@/models'
import { ProfileModel } from '@/models'

export interface UserModel extends Base {
    email: string
    isActive: boolean
    image: string
    roleId: number
    profileId: number
    readonly role?: RoleModel
    readonly profile?: ProfileModel
}
