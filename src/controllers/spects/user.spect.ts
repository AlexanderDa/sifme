import { OperationObject } from '@loopback/rest'
import { RequestBodyObject } from '@loopback/rest'
import { SpectScheme } from './Spect'
import { responseCountSchema } from './Spect'
import { responseSimpleSchema } from './Spect'
import { requestBodySchema } from './Spect'
import { responseOneSchema } from './Spect'
import { responsePatchCountSchema } from './Spect'
import { responseListSchema } from './Spect'
import { User } from '../../models'

class UserSpect implements SpectScheme {
    /**
     * Specifications to request a body.
     */
    requestBody(): RequestBodyObject {
        return requestBodySchema(User, {
            exclude: [
                'createdAt',
                'createdBy',
                'deleted',
                'deletedAt',
                'deletedBy',
                'id',
                'image',
                'password',
                'isActive',
                'emailVerified',
                'passwordResetToken',
                'verificationToken'
            ]
        })
    }

    /**
     * Specifications to request partial body.
     */
    requestPartialBoby(): RequestBodyObject {
        return requestBodySchema(User, {
            partial: true,
            exclude: [
                'createdAt',
                'createdBy',
                'deleted',
                'deletedAt',
                'deletedBy',
                'id',
                'password',
                'emailVerified',
                'passwordResetToken',
                'verificationToken'
            ]
        })
    }

    /**
     * Specifications to response total of users.
     */
    responseCount(): OperationObject {
        return responseCountSchema(User)
    }

    /**
     * Specifications to response one user.
     */
    responseOne(): OperationObject {
        return responseOneSchema(User, {
            includeRelations: true,
            exclude: ['password', 'verificationToken', 'passwordResetToken']
        })
    }

    /**
     * Specifications to response array of users.
     */
    responseList(): OperationObject {
        return responseListSchema(User, { includeRelations: true })
    }

    /**
     * Specifications to response count of users updates.
     */
    responsePatchCount(): OperationObject {
        return responsePatchCountSchema(User)
    }

    /**
     * Specifications to response 204 status.
     * @param method methods allowed PATCH, PUT, DELETE
     */
    responseSimple(method: 'PATCH' | 'PUT' | 'DELETE'): OperationObject {
        return responseSimpleSchema(User, method)
    }
}

export default new UserSpect()
