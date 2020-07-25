import { Base } from '@/models'

export interface ProfileModel extends Base {
    dni?: string
    passport?: string
    lastName: string
    firstName: string
    telephone?: string
    mobile?: string
    email?: string
    image?: string
    regProfessional?: string
    address: string
}

export function createProfile(): ProfileModel {
    return {
        createdAt: '',
        createdBy: 0,
        deleted: false,
        deletedAt: '',
        deletedBy: 0,
        id: 0,
        firstName: '',
        lastName: '',
        address: ''
    }
}
