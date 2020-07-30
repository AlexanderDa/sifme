import { model, property, belongsTo } from '@loopback/repository'
import { Base } from '.'
import { Role } from './role.model'

@model({
    name: 'dbuser',
    settings: {
        hiddenProperties: ['password', 'verificationToken', 'passwordResetToken'],
        foreignKeys: {
            fkUserRole: {
                name: 'fk_user_role',
                entity: 'Role',
                entityKey: 'id',
                foreignKey: 'roleid'
            },
            fkUserProfile: {
                name: 'fk_user_profile',
                entity: 'Profile',
                entityKey: 'id',
                foreignKey: 'profileid'
            }
        },
        indexes: {
            uniqueEmail: {
                keys: { email: 1 },
                options: { unique: true }
            },
            uniquePasswordResetTokenCode: {
                keys: { passwordResetToken: 1 },
                options: { unique: true }
            },
            uniqueVerificationToken: {
                keys: { verificationToken: 1 },
                options: { unique: true }
            }
        }
    }
})
export class User extends Base {
    @property({
        type: 'number',
        id: true,
        generated: true
    })
    id?: number

    @property({
        type: 'string',
        required: true,
        length: 50,
        postgresql: {
            dataType: 'character varying',
            dataLength: 50
        }
    })
    email: string

    @property({
        type: 'string',
        required: false,
        length: 75,
        postgresql: {
            dataType: 'character varying',
            dataLength: 75
        }
    })
    password: string

    @property({
        type: 'boolean',
        default: false,
        required: true
    })
    emailVerified?: boolean

    @property({
        type: 'string',
        required: false
    })
    verificationToken: string

    @property({
        type: 'boolean',
        default: true
    })
    isActive?: boolean

    @property({
        type: 'string'
    })
    passwordResetToken?: string

    @belongsTo(() => Role, {}, { required: true })
    roleId: number

    @property({
        type: 'number'
    })
    profileId?: number

    constructor(data?: Partial<User>) {
        super(data)
    }
}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations
