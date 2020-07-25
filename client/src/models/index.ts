export * from '@/models/RoleModel'
export * from '@/models/ProfileModel'
export * from '@/models/UserModel'

export interface Base {
    createdAt: string
    createdBy: number
    deleted: boolean
    deletedAt: string
    deletedBy: number
    id: number
}
