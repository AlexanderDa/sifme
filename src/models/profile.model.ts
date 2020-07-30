import { model, property, hasOne } from '@loopback/repository'
import { Base } from '.'
import { User } from './user.model'

@model({
    settings: {
        indexes: {
            uniqueProfileEmail: {
                keys: { email: 1 },
                options: { unique: true }
            },
            uniqueProfileDni: {
                keys: { dni: 1 },
                options: { unique: true }
            },
            uniqueProfilePassport: {
                keys: { passport: 1 },
                options: { unique: true }
            }
        }
    }
})
export class Profile extends Base {
    @property({
        type: 'number',
        id: true,
        generated: true
    })
    id?: number

    @property({
        type: 'string',
        length: 10,
        postgresql: {
            dataType: 'character varying',
            dataLength: 10
        }
    })
    dni: string

    @property({
        type: 'string',
        length: 15,
        postgresql: {
            dataType: 'character varying',
            dataLength: 15
        }
    })
    passport: string

    @property({
        type: 'string',
        required: true,
        length: 30,
        postgresql: {
            dataType: 'character varying',
            dataLength: 30
        }
    })
    lastName: string

    @property({
        type: 'string',
        required: true,
        length: 30,
        postgresql: {
            dataType: 'character varying',
            dataLength: 30
        }
    })
    firstName: string

    @property({
        type: 'string',
        length: 15,
        postgresql: {
            dataType: 'character varying',
            dataLength: 15
        }
    })
    telephone?: string

    @property({
        type: 'string',
        length: 15,
        postgresql: {
            dataType: 'character varying',
            dataLength: 15
        }
    })
    mobile?: string

    @property({
        type: 'string',
        length: 50,
        required: true,
        postgresql: {
            dataType: 'character varying',
            dataLength: 50
        }
    })
    email?: string

    @property({
        type: 'string',
        length: 75,
        postgresql: {
            dataType: 'character varying',
            dataLength: 75
        }
    })
    image?: string

    @property({
        type: 'string',
        length: 25,
        postgresql: {
            dataType: 'character varying',
            dataLength: 25
        }
    })
    regProfessional?: string

    @property({
        type: 'string',
        required: true
    })
    address: string

    @hasOne(() => User)
    user: User

    constructor(data?: Partial<Profile>) {
        super(data)
    }
}

export interface ProfileRelations {
    // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations
